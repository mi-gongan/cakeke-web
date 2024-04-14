import "./DetailPage.css";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import BackButton from "../icon/BackButton";
import { mdRehypeRewrite } from "../../util/option";
import remarkGfm from "remark-gfm";

function DetailPage() {
  const curationId = window.location.search.split("=")[1];
  const navigate = useNavigate();
  const [curation, setCuration] = useState(undefined);

  const [markdown, setMarkdown] = useState(``);

  const getCuration = async () => {
    const response = await axios.get(`/curation/${curationId}`);
    setCuration(response.data);
  };

  useEffect(() => {
    getCuration();
  }, []);

  useEffect(() => {
    if (!curation) return;
    fetch(curation.mdUrl)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, [curation, navigate]);

  useEffect(() => {
    // 손가락으로 좌에서 우로 스와이프 했을 때 뒤로가기
    const handleTouchStart = (e) => {
      const touchStartX = e.changedTouches[0].clientX;
      const touchStartY = e.changedTouches[0].clientY;

      const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        console.log(touchStartX, touchEndX, touchStartY, touchEndY);
        if (
          touchEndX - touchStartX > 50 &&
          Math.abs(touchEndY - touchStartY) < 50
        ) {
          navigate("/");
        }
      };

      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchend", handleTouchEnd);
      };
    };

    document.addEventListener("touchstart", handleTouchStart);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  if (!curation) return <div></div>;

  return (
    <div className="detail">
      <div className="detail-head">
        <div className="back-button" onClick={() => navigate("/")}>
          <BackButton />
        </div>
        <div className="head-title">상세글보기</div>
      </div>
      <div
        className="cover"
        style={{
          backgroundImage: `url(${curation.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <div className="cover-title">{curation.title}</div>
        <div className="cover-date">
          {new Date(curation.createdOn).getFullYear()}.
          {new Date(curation.createdOn).getMonth() + 1}.
          {new Date(curation.createdOn).getDate()}
        </div>
      </div>
      <div className="markdown">
        <MDEditor.Markdown
          remarkPlugins={[remarkGfm]}
          source={markdown}
          style={{
            backgroundColor: "white",
            color: "black",
          }}
          rehypeRewrite={mdRehypeRewrite}
        />
      </div>
    </div>
  );
}

export default DetailPage;
