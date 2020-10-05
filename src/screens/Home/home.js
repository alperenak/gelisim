import React, { useContext, useEffect, useState } from "react";
import styles from "./home.module.scss";
import TopBar from "../../components/topBar/topBar";
import Card from "../../components/Card/card";
import Avatar from "../../assets/images/teacherAvatar.png";
import AnnouncementImage from "../../assets/images/announcements.png";
import { UserContext } from "../../context/userContext";
import {
  GetAnnouncements,
  GetToken,
  GetUser,
  IsAuth,
} from "../../actions/action";
import Loading from "../../components/Loading/loading";
export default function Home() {
  const [userData, setUserData] = useContext(UserContext);
  const [announcementsData, setAnnouncementsData] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = GetToken();
  console.log(userData);
  useEffect(() => {
    if (IsAuth(token)) {
      if (!userData) {
        setLoading(true);
        GetUser(token)
          .then((data) => setUserData(data))
          .then(() => setLoading(false))
          .catch((e) => window.location.reload());
      }
      if (!announcementsData) {
        GetAnnouncements(5, 1, token)
          .then((data) => setAnnouncementsData(data))
          .catch((e) => {
            window.location.reload();
          });
      }
    } else window.location.replace("/");
  }, []);
  return (
    <>
      {announcementsData && userData ? (
        <div className={styles.homeWrapper}>
          <div className={styles.homeContainer}>
            <div className={styles.homeMain}>
              <div className={styles.announcements}>
                <Card
                  type={"announcements"}
                  announcementsData={
                    announcementsData ? announcementsData.data.data : ""
                  }
                />
                <Card
                  type={"syllabus"}
                  syllabusData={userData.data.data.studentInfo.class.schedule}
                />
                <Card
                  type={"schedule"}
                  scheduleData={userData.data.data.studentInfo.class.exams}
                  teachersData={userData.data.data.studentInfo.class.courses}
                />
              </div>
            </div>
            <div className={styles.rightSide}>
              <Card
                type={"classes"}
                name={
                  userData.data.data.first_name +
                  " " +
                  userData.data.data.last_name
                }
                classroomName={`${getClassName(
                  userData.data.data.studentInfo.class.name
                )}`}
                avatar={userData.data.data.profile_photo}
              />
              <Card
                type={"teachers"}
                teachersData={userData.data.data.studentInfo.class.courses}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
function getClassName(name) {
  if (name && name !== null) {
    return `${name.slice(0, name.length - 1)} / ${name.slice(
      name.length - 1,
      name.length
    )} Sınıfı`;
  } else return "none";
}
// const announcementsData = [
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
//   {
//     announcementsTitle: "Gelişim okulları 2020-2021 eğitim yılına hazır!",
//     image: AnnouncementImage,
//     date: "31 Ağustos 2020",
//   },
// ];
const teachersData = [
  {
    teacherName: "Alperen Karagüzel",
    avatar: Avatar,
    branch: "Sosyal Bilgiler Öğretmeni",
  },
  {
    teacherName: "Kerem Kara",
    avatar: Avatar,
    branch: "Beden Eğitimi Öğretmeni",
  },
  {
    teacherName: "Ali Harun",
    avatar: Avatar,
    branch: "Fen Bilimleri Öğretmeni",
  },
  {
    teacherName: "Mustafa Ulusoy",
    avatar: Avatar,
    branch: "Türkçe Öğretmeni",
  },
];
