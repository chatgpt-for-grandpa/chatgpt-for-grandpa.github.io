import React, { memo, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Collapse from "react-bootstrap/Collapse";

function ProjectIntro() {
  const [activeTab, setActiveTab] = useState("");

  const activeInfo = () => setActiveTab(activeTab === "info" ? "" : "info");
  const activePurpose = () =>
    setActiveTab(activeTab === "purpose" ? "" : "purpose");
  const activeSupport = () =>
    setActiveTab(activeTab === "support" ? "" : "support");

  return (
    <div className="project-intro p-2 mb-3 border rounded-bottom">
      <ButtonGroup
        aria-label="Basic example"
        className="d-flex"
        style={{ maxWidth: 450 }}
      >
        <Button variant="link" size="lg" className="px-0" onClick={activeInfo}>
          项目介绍
        </Button>
        <Button
          variant="link"
          size="lg"
          className="px-0"
          onClick={activePurpose}
        >
          项目宗旨
        </Button>
        <Button
          variant="link"
          size="lg"
          className="px-0"
          onClick={activeSupport}
        >
          支持项目
        </Button>
      </ButtonGroup>

      <Collapse in={activeTab === "info"}>
        <div id="intro__info">
          <p>
            这是一个免费的在线聊天工具，旨在让用户更方便地享受科技带来的便利。用户可以使用我们的工具来获取答案、寻求建议、进行翻译和计算等等。这是由一位个人开发者创建的，水平有限，如遇到问题也多包涵。同时，我们欢迎大家一起讨论技术问题和提出技术指导，让我们共同进步。
          </p>
          <p>
            我们采用了现在最流行的模型提供聊天服务，用户可以直接访问链接使用此工具。我们不会要求用户进行任何登录操作，也不会在后台保留任何用户隐私数据。这样做虽然可能会带来一些不便，但我们坚信保护用户隐私才是正确的做法。
            <a
              href="https://gitee.com/xu-zhanwei/chatanywhere/blob/master/README.md"
              target="_blank"
              rel="noreferrer"
            >
              完整信息
            </a>
          </p>
        </div>
      </Collapse>

      <Collapse in={activeTab === "purpose"}>
        <div id="intro__purpose">
          <p>
            我们想让更多大众也用上免费、正版的chatgpt，想让更多人平等地享受到科技进步带来的便利。
          </p>
          <p>
            我最初开发了一个给父母使用的版本，当我将这个项目分享，我的高中老师告诉我市场上的类似应用通常在几次对话后会要求用户支付15元的费用，但我能够开发出一个完全免费的工具供大家使用，这是难以置信的成就。我马上告诉他其实我只调用了一个API接口。
          </p>
          <p>
            我震惊地发现，进步的科技传递给更多人同时，伴随着怎样的混乱与暴利。
            <a
              href="https://gitee.com/xu-zhanwei/chatanywhere/blob/master/purpose.md"
              target="_blank"
              rel="noreferrer"
            >
              完整信息
            </a>
          </p>

          <p>
            <small>
              (为了更好地专注于最需要的人群，本项目目前仅限中国大陆ip使用。)
            </small>
          </p>
        </div>
      </Collapse>

      <Collapse in={activeTab === "support"}>
        <div id="intro__support">
          <p>您觉得这个项目有用，请将它分享给更多人。</p>
          <p>
            为了让这个项目能够继续下去，我希望能向您提供三种方式，从而获得您的支持和帮助，以便继续为您服务。
            <a
              href="https://gitee.com/xu-zhanwei/chatanywhere/blob/master/Support.md"
              target="_blank"
              rel="noreferrer"
            >
              完整信息
            </a>
          </p>
        </div>
      </Collapse>
    </div>
  );
}

export default memo(ProjectIntro);
