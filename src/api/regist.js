import request from "@utils/request.js";

// 当前公共请求地址前缀
const url_prefix = "/regist";

export const reqVerifyPhone = (phone) => {
  return request({
    method: "POST",
    url: `${url_prefix}/verify_phone`,
    data: {
      phone,
    },
  });
};

export const reqVerifyCode= (phone,code) => {
  return request({
    method: "POST",
    url: `${url_prefix}/verify_code`,
    data: {
      phone,
      code,
    },
  });
};

