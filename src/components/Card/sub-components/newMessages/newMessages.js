import React from "react";
import { convertHourMinute } from "../../../../utils/utils";
import styles from "./newMessages.module.scss";
export default function NewMessages({ newMessagesData }) {
  return (
    <>
      <div className={styles.teachers}>
        <div className={styles.title}>Yeni Mesajlar</div>
        <div className={styles.teachersSection}>
          {newMessagesData.data?.data.conversations.map((item) => {
            return (
              <div
                className={`${"messageContainer"} ${styles.messagesContainer}`}
                onClick={() =>
                  (window.location = `/messages/details/${item.lastMessage.conversationId}`)
                }
              >
                <div className="messageContainer__avatar">
                  <img src={item.contact.avatar} alt="" />
                  {item.unread && item.unread > 0 && (
                    <div className="messageContainer__avatar__unread">
                      {item.unread}
                    </div>
                  )}
                </div>
                <div className="messageContainer__content">
                  <div className={"messageContainer__content__name"}>
                    {item.contact.name}
                  </div>
                  <div
                    className={`${"messageContainer__content__message"} ${
                      item.unread && item.unread > 0 && item.lastMessage
                    }`}
                  >
                    {item.lastMessage.body}
                  </div>
                </div>
                <div className={"messageContainer__time"}>
                  {convertHourMinute(item.lastMessage.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}