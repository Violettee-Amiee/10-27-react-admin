import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Toast } from "antd-mobile";
import { reqVerifyCode } from "@api/common";

// web端接入文档：https://cloud.tencent.com/document/product/1110/36841#.E5.AE.9E.E4.BE.8B.E6.96.B9.E6.B3.95

// 滑块验证码组件
export default class VerifyButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.verifyCallback = async (res) => {
      // console.log(res);
      if (res.ret === 0) {
        try {
          // 服务端验证
          await reqVerifyCode(res.randstr, res.ticket);
          // 做其他事
          this.props.callback();
        } catch (e) {
          Toast.fail(e, 3);
        }
      }
    };
  }

  render() {
    const { disabled, btnText } = this.props;

    return (
      <>
        <Button
          style={{ display: disabled ? "block" : "none" }}
          className="warning-btn"
          type="warning"
          disabled
        >
          {btnText}
        </Button>
        <Button
          style={{ display: !disabled ? "block" : "none" }}
          id="TencentCaptcha"
          data-appid="2030765311"
          data-cbfn="verifyCallback"
          className="warning-btn"
          type="warning"
        >
          {btnText}
        </Button>
      </>
    );
  }
}
