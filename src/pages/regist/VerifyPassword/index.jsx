import React, { useState } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import { reqRegistUser } from "@api/regist";

import msg from "@assets/imgs/msg.png";
import "./index.css";

function VerifyPassword({ form, location, history }) {
  // 是否显示密码
  const [isSecret, setIsSecret] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const { getFieldProps, getFieldValue } = form;

  //
  const iconClassName =
    "iconfont verify-password-icon " + (isSecret ? "icon-eye1" : "icon-eye");

  // 设置密码显示与隐藏更改
  const setSecret = () => {
    setIsSecret(!isSecret);
  };

  // 验证6位数短信验证码
  const validator = (rule, value, callback) => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      isDisabled = false;
    }

    setIsDisabled(isDisabled);

    callback();
  };

  // 点击下一步,调用接口，进入登入界面
  const next = async () => {
    const phone = location.state;
    const password = getFieldValue("password");
    console.log(phone, password);
    await reqRegistUser(phone, password);
    history.push("/login");
  };

  return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon className="left" type="left" />}
        // onLeftClick={this.goBack}
      >
        硅谷注册
      </NavBar>
      <WingBlank>
        <img className="verify-code-msg" src={msg} alt="msg" />
        <p className="verify-code-tip">请设置登录密码</p>
        <InputItem
          {...getFieldProps("password", {
            rules: [{ validator }],
          })}
          type={isSecret ? "password" : "text"}
          className="verify-password-btn"
          placeholder="请设置8-20位登录密码"
          extra={<span onTouchEnd={setSecret} className={iconClassName}></span>}
        />
        <p className="verify-password-text">
          密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
        </p>
        <Button
          onClick={next}
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

export default createForm()(VerifyPassword);
