import React, { useContext, useState } from "react";
import styles from "./activity.module.scss";
import TeacherAvatar from "../../../../assets/images/teacherAvatar.png";
import { Ders, User } from "../../../../icons";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import { CreateUser, GetToken, updateUser } from "../../../../actions/action";
import { useHistory } from "react-router-dom";
import { SingleUserContext } from "../../../../context/singleUserContext";

export default function ActivityManagement({
  tabsType,
  teachersData,
  studentsData,
  classData,
}) {
  const [classId, setClassId] = useState(false);
  const history = useHistory();

  return (
    <>
      <div className={styles.schedule}>
        <div className={styles.topSide}>
          <div className={styles.title}>Raporlar</div>
        </div>
        <div className={styles.scheduleTitlesSection}>
          <table>
            <tr className={styles.scheduleTitlesRow}>
              <div className={styles.scheduleTitles}>
                <User
                  className={`${styles.scheduleTitlesIcon} ${styles.user}`}
                />
                <td className={styles.ogretmen}>Ad Soyad</td>
              </div>
              {tabsType === "student" ? (
                <div className={styles.scheduleTitles}>
                  <Ders className={`${styles.scheduleTitlesIcon}`} />
                  <td>Sınıf</td>
                </div>
              ) : (
                ""
              )}
            </tr>
          </table>
        </div>
        <div className={styles.scheduleSection}>
          <table>
            {studentsData && studentsData !== null && tabsType === "student"
              ? studentsData.map((item, index) => {
                  return (
                    <tr
                      onClick={() => {
                        setClassId(item._id);

                        history.push(`/admin/activity/${item._id}`);
                      }}
                    >
                      <div className={styles.scheduleTeacher}>
                        <div className={styles.avatar}>
                          <img alt="" src={item.profile_photo} />
                        </div>
                        <td>{`${item.first_name} ${item.last_name}`}</td>
                      </div>
                      <td>
                        {item.studentInfo
                          ? item.studentInfo.class?.name
                          : "sınıf bilgisi yok"}
                      </td>
                      <td className={styles.space}>
                        {/* <PlusCircleSolid className={styles.addExamIcon} /> */}
                      </td>
                      <td className={styles.space}></td>
                    </tr>
                  );
                })
              : tabsType === "teacher"
              ? teachersData.map((item) => {
                  return (
                    <tr
                      onClick={() => {
                        setClassId(item._id);

                        history.push(`/admin/activity/${item._id}`);
                      }}
                    >
                      <div className={styles.scheduleTeacher}>
                        <div className={styles.avatar}>
                          <img alt="" src={item.profile_photo} />
                        </div>
                        <td>{`${item.first_name} ${item.last_name}`}</td>
                      </div>
                      <td className={styles.space}></td>
                      <td className={styles.space}></td>
                    </tr>
                  );
                })
              : classData.map((item) => {
                  return (
                    <tr
                      onClick={() => {
                        setClassId(item._id ? item._id : item.id);
                        history.push(`/admin/activity/${item._id}?class=true`);
                      }}
                    >
                      <div className={styles.scheduleTeacher}>
                        <div className={styles.avatar}>
                          <img alt="" src={TeacherAvatar} />
                        </div>
                        <td>{item.name}</td>
                      </div>

                      <td className={styles.space}></td>
                      <td className={styles.space}></td>
                    </tr>
                  );
                })}
          </table>
        </div>
      </div>
    </>
  );
}
