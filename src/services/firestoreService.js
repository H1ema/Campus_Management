import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// ── FEES ──────────────────────────────────────────────────────────────────────

export const getAllFees = async () => {
  try {
    const snapshot = await getDocs(collection(db, "fees"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getAllFees:", error);
    return [];
  }
};

export const getStudentFee = async (userId, userName) => {
  try {
    // 🚨 HARD BLOCK (IMPORTANT)
    if (!userId || typeof userId !== "string") {
      console.error("❌ BLOCKED getStudentFee: invalid userId =", userId);
      return null;
    }

    let q = query(
      collection(db, "fees"),
      where("userId", "==", userId)
    );

    let snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const d = snapshot.docs[0];
      return { id: d.id, ...d.data() };
    }

    // Fallback: Try matching by student name (handles manual entries in Firebase)
    if (userName) {
      q = query(collection(db, "fees"), where("studentName", "==", userName));
      snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const d = snapshot.docs[0];
        return { id: d.id, ...d.data() };
      }
    }

    return null;

  } catch (error) {
    console.error("🔥 Error in getStudentFee:", error);
    return null;
  }
};

export const updateFee = async (feeId, data) => {
  try {
    if (!feeId) return;
    const ref = doc(db, "fees", feeId);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error in updateFee:", error);
  }
};

// ── COMPLAINTS ────────────────────────────────────────────────────────────────

export const getAllComplaints = async () => {
  try {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getAllComplaints:", error);
    return [];
  }
};

export const getUserComplaints = async (userId) => {
  try {
    // 🚨 HARD BLOCK
    if (!userId || typeof userId !== "string") {
      console.error("❌ BLOCKED getUserComplaints: invalid userId =", userId);
      return [];
    }

    const q = query(
      collection(db, "complaints"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    let docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    
    // Sort in memory to avoid needing a Firestore composite index
    docs.sort((a, b) => {
      const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
      const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
      return timeB - timeA;
    });

    return docs;

  } catch (error) {
    console.error("🔥 Error in getUserComplaints:", error);
    return [];
  }
};

export const addComplaint = async (complaintData) => {
  try {
    const ref = await addDoc(collection(db, "complaints"), {
      ...complaintData,
      status: "Submitted",
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch (error) {
    console.error("Error in addComplaint:", error);
  }
};

export const updateComplaintStatus = async (complaintId, status) => {
  try {
    if (!complaintId) return;
    const ref = doc(db, "complaints", complaintId);
    await updateDoc(ref, { status, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("Error in updateComplaintStatus:", error);
  }
};

// ── HOSTEL ────────────────────────────────────────────────────────────────────

export const getAllRooms = async () => {
  try {
    const snapshot = await getDocs(collection(db, "hostelRooms"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getAllRooms:", error);
    return [];
  }
};

export const getStudentHostelApp = async (userId) => {
  try {
    // 🚨 HARD BLOCK
    if (!userId || typeof userId !== "string") {
      console.error("❌ BLOCKED getStudentHostelApp: invalid userId =", userId);
      return null;
    }

    const q = query(
      collection(db, "hostelApplications"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() };

  } catch (error) {
    console.error("🔥 Error in getStudentHostelApp:", error);
    return null;
  }
};

export const applyForRoom = async (userId, userName) => {
  try {
    if (!userId) return;

    const ref = await addDoc(collection(db, "hostelApplications"), {
      userId,
      userName,
      status: "Applied",
      createdAt: serverTimestamp(),
    });

    return ref.id;
  } catch (error) {
    console.error("Error in applyForRoom:", error);
  }
};

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

export const getDashboardStats = async () => {
  try {
    const [studentsSnap, complaintsSnap] = await Promise.all([
      getDocs(collection(db, "fees")),
      getDocs(
        query(
          collection(db, "complaints"),
          where("status", "!=", "Resolved")
        )
      ),
    ]);

    return {
      students: studentsSnap.size.toString(),
      courses: "34",
      attendance: "92%",
      activeComplaints: complaintsSnap.size.toString(),
    };
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    return {
      students: "0",
      courses: "0",
      attendance: "0%",
      activeComplaints: "0",
    };
  }
};

// ── CLASSES ───────────────────────────────────────────────────────────────────

export const getAllClasses = async () => {
  try {
    const snapshot = await getDocs(collection(db, "classes"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getAllClasses:", error);
    return [];
  }
};

// ── TIMETABLE ─────────────────────────────────────────────────────────────────

export const getTimetableEntries = async () => {
  try {
    const snapshot = await getDocs(collection(db, "timetable"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getTimetableEntries:", error);
    return [];
  }
};

// ── CONTACTS ──────────────────────────────────────────────────────────────────

export const getAllContacts = async () => {
  try {
    const snapshot = await getDocs(collection(db, "contacts"));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getAllContacts:", error);
    return [];
  }
};

// ── STUDENTS ──────────────────────────────────────────────────────────────────

export const getAllStudents = async () => {
  try {
    const q = query(collection(db, "users"), where("role", "==", "student"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error in getAllStudents:", error);
    return [];
  }
};