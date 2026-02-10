// 共享的验证配置 - 单一数据源
export const venusValidationConfig = {
  name: {
    minLength: 2,
    maxLength: 100,
    required: true,
    errorMessages: {
      required: "场馆名称不能为空",
      minLength: "场馆名称至少需要2个字符",
      maxLength: "场馆名称不能超过100个字符",
    },
  },
  address: {
    minLength: 10,
    maxLength: 255,
    required: true,
    errorMessages: {
      required: "场馆地址不能为空",
      minLength: "场馆地址至少需要10个字符",
      maxLength: "场馆地址不能超过255个字符",
    },
  },
  stateId: {
    required: true,
    errorMessages: {
      required: "场馆所属州不能为空",
    },
  },
} as const;
