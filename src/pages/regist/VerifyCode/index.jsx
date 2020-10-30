import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import { reqSendCode } from "@api/login";
import { reqVerifyCode } from "@api/regist";

import msg from "./msg.png";
import "./index.css";

// 倒计时总长
const TOTAL_TIME = 60;

class VerifyCode extends Component {
  state = {
    // 决定缩放显示获取验证码
    isSendCode: true,
    // 倒计时时间
    time: TOTAL_TIME,

    isDisabled: true,
  };

  componentDidMount() {
    this.setTimer();
  }

  // 设置倒计时定时器
  setTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time - 1;

      if (time <= 0) {
        clearInterval(this.timer);
        this.setState({
          isSendCode: false,
          time: TOTAL_TIME,
        });
        return;
      }

      this.setState({
        time,
      });
    }, 1000);
  };

  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.timer);
  }

  // 发送验证码
  sendCode = () => {
    const phone = this.props.location.state;

    Modal.alert("", `我们将发送短信/语音验证码至：${phone}`, [
      {
        text: "取消",
        // onPress: () => console.log("cancel"),
      },
      {
        text: "确定",
        style: { background: "red", color: "#fff" },
        onPress: async () => {
          // 发送请求 请求短信验证码
          await reqSendCode(phone);

          this.setState({
            isSendCode: true,
          });
          // 重新开启定时器
          this.setTimer();
        },
      },
    ]);
  };

  // 验证表单
  validator = (rule, value, callback) => {
    const reg = /^[0-9]{6}$/;

    let isDisabled = true;

    if (reg.test(value)) {
      isDisabled = false;
    }

    this.setState({
      isDisabled,
    });

    // 必须执行
    callback();
  };

  //
  next = async () => {
    const phone = this.props.location.state;
    const code = this.props.form.getFieldValue("code");
    // 验证验证码是否正确
    await reqVerifyCode(phone, code);

    this.props.history.push("/regist/verifypassword", phone);
  };

  // 回退
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { isSendCode, time, isDisabled } = this.state;
    const { getFieldProps } = this.props.form;

    const btnClassName =
      "verify-code-btn" + (isSendCode ? "verify-code-btn-disabled" : "");
    const btnText = isSendCode ? `重新发送(${time}s)` : "获取验证码";

    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon className="left" type="left" />}
          onLeftClick={this.goBack}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <img className="verify-code-msg" src={msg} alt="msg" />
          <p className="verify-code-tip">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <div className="verify-code-container">
            <InputItem
              {...getFieldProps("code", {
                rules: [{ validator: this.validator }],
              })}
              placeholder="请输入手机验证码"
            />
            {/* <Button className="verify-code-btn">获取验证码</Button> */}
            <Button className={btnClassName} onClick={this.sendCode}>
              {btnText}
            </Button>
          </div>
          <Button
            onClick={this.next}
            type="warning"
            disabled={isDisabled}
            className="warning-btn"
          >
            下一步
          </Button>
          <span className="verify-code-question">
            遇到问题?请<a href="#!">联系客服</a>
          </span>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(VerifyCode);
