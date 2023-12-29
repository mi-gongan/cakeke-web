import { useRecoilValue } from "recoil";
import "./DetailPage.css";

import React, { useEffect, useState } from "react";
import { currentCurationAtom } from "../../store/atom";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

function DetailPage() {
  const navigate = useNavigate();
  const currentCuration = useRecoilValue(currentCurationAtom);

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(currentCuration.mdUrl)
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="detail">
      <div className="detail-head">
        <div className="back-button" onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="head-title">상세글보기</div>
      </div>
      <div
        className="cover"
        style={{
          backgroundImage: `url(${currentCuration.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}
      >
        <div className="cover-title">{currentCuration.title}</div>
        <div className="cover-date">
          {new Date(currentCuration.createdOn).toLocaleDateString()}
        </div>
      </div>
      <div className="detail-description">
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
}

export default DetailPage;
