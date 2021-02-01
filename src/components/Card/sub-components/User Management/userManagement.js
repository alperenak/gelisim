import React, { useEffect, useState } from "react";
import styles from "./userManagement.module.scss";
import {
  Ders,
  User,
  PlusCircleSolid,
  TrashSolid,
  Down,
} from "../../../../icons";
import Modal from "../../../Modal/modal";
import Input from "../../../Input/input";
import Button from "../../../Button/button";
import {
  CreateUser,
  deleteUser,
  GetToken,
  updateUser,
} from "../../../../actions/action";
import { useHistory } from "react-router-dom";
// import teacherAvatar from "../../../../assets/images/teacherAvatar.png";
export default function UserManagement({
  tabsType,
  studentsData,
  teachersData,
}) {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [classId, setClassId] = useState(false);
  const history = useHistory();
  const token = GetToken();
  console.log("general", studentsData);

  return (
    <div className={styles.schedule}>
      <div className={styles.topSide}>
        <div className={styles.title}>Kullanıcı Yönetimi</div>
        <div
          onClick={() => {
            setIsActive(true);
            setModalType("add");
          }}
          className={styles.feedback}
        >
          <PlusCircleSolid className={styles.feedbackIcon} />
          <div className={styles.feedbackTitle}>
            {tabsType === "student"
              ? "Yeni Öğrenci Oluştur"
              : "Yeni Öğretmen oluştur"}
          </div>
        </div>
      </div>
      <div className={styles.scheduleTitlesSection}>
        <table>
          <tr className={styles.scheduleTitlesRow}>
            <div className={styles.scheduleTitles}>
              <User className={`${styles.scheduleTitlesIcon} ${styles.user}`} />
              <td className={styles.ogretmen}>Ad Soyad</td>
            </div>
            <div className={styles.scheduleTitles}>
              <Ders
                className={`${styles.scheduleTitlesIcon} ${styles.editAndDelete}`}
              />
              <td>Düzenle ve Sil</td>
            </div>
          </tr>
        </table>
      </div>
      <div className={styles.scheduleSection}>
        <table>
          {studentsData && studentsData !== null && tabsType === "student"
            ? studentsData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      setClassId(item._id);
                      history.push(
                        `/admin/user/${tabsType}/${
                          item.id ? item.id : item._id
                        }`
                      );
                    }}
                  >
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <img src={item.profile_photo} />
                      </div>
                      <td>{`${item.first_name} ${item.last_name}`}</td>
                    </div>
                    <td>
                      {item.studentInfo
                        ? item.studentInfo.class?.name
                        : "sınıf bilgisi yok"}
                    </td>
                    <td className={styles.space}></td>
                    <td className={styles.space}>
                      x
                      <TrashSolid
                        onClick={() => {
                          deleteUser(token, item._id);
                        }}
                        className={styles.deleteIcon}
                      />
                    </td>
                  </tr>
                );
              })
            : teachersData.map((item, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      setClassId(item._id);
                      history.push(
                        `/admin/user/${tabsType}/${
                          item.id ? item.id : item._id
                        }`
                      );
                    }}
                  >
                    <div className={styles.scheduleTeacher}>
                      <div className={styles.avatar}>
                        <img src={item.profile_photo} />
                      </div>
                      <td>{`${item.first_name} ${item.last_name}`}</td>
                    </div>
                    <td className={styles.space}></td>
                    <td className={styles.space}>
                      <TrashSolid
                        onClick={() => {
                          deleteUser(token, item._id);
                        }}
                        className={styles.deleteIcon}
                      />
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
      <Modal isActive={isActive} setIsActive={setIsActive}>
        <RenderModalContent
          isActive={isActive}
          setIsActive={setIsActive}
          type={modalType}
          classId={classId}
          tabsType={tabsType}
          teachersData={teachersData}
        />
      </Modal>
    </div>
  );
}

function RenderModalContent({ type, setIsActive, classId, tabsType }) {
  console.log(classId);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [dropdownActive, setDropdownActive] = useState();
  const [dropdownName, setDropdownName] = useState("Cinsiyeti Seçiniz");
  const token = GetToken();

  useEffect(() => {
    if (tabsType === "student") setRole("student");
    else setRole("instructor");
  }, [tabsType]);
  if (type === "edit")
    return (
      <>
        <Input
          placeholder="Adını Giriniz"
          onChange={(e) => setFirstname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Soyadını giriniz"
          onChange={(e) => setLastname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Numarasını giriniz"
          onChange={(e) => setPhone(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="E-postasını giriniz"
          onChange={(e) => setUsername(e.target.value)}
          inputStyle={"modal"}
        />
        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            setIsActive(false);
            updateUser(
              token,
              firstname,
              lastname,
              username,
              phone,
              classId
            ).then(() => window.location.reload());
            setIsActive(false);
          }}
        />
      </>
    );
  else if (type === "add") {
    return (
      <>
        <Input
          placeholder="Adı giriniz"
          onChange={(e) => setFirstname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Soyadı giriniz"
          onChange={(e) => setLastname(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="E-posta giriniz"
          onChange={(e) => setUsername(e.target.value)}
          inputStyle={"modal"}
        />
        <Input
          placeholder="Telefon Numarası giriniz"
          onChange={(e) => setPhone(e.target.value)}
          inputStyle={"modal"}
        />

        <div
          id={"classDropdown"}
          onClick={() => setDropdownActive(!dropdownActive)}
          className={styles.dropdown}
        >
          <div id={"dropdownName"} className={styles.dropdownName}>
            <Down id={"dropdownIcon"} className={styles.downIcon} />
            {dropdownName}
          </div>
          <div
            className={`${styles.dropdownContent}  ${
              dropdownActive ? styles.active : ""
            }`}
            onClick={() => {}}
          >
            {[{ name: "Erkek" }, { name: "Kız" }].map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setDropdownName(item.name);
                    if (item.name === "Erkek") setGender("male");
                    else if (item.name === "Kız") setGender("female");
                  }}
                  className={styles.dropdownItems}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <Button
          type={"modal"}
          title={"Ekle"}
          onClick={() => {
            setIsActive(false);
            CreateUser(
              token,
              firstname,
              lastname,
              username,
              phone,
              role,
              gender
            ).then(() => window.location.reload());
          }}
        />
      </>
    );
  } else return <></>;
}
