// 共享的验证配置 - 单一数据源
export const eventsValidationConfig = {
  artist: {
    minLength: 2,
    maxLength: 50,
    required: true,
    errorMessages: {
      required: "艺术家名称不能为空",
      minLength: "艺术家名称至少需要2个字符",
      maxLength: "艺术家名称不能超过50个字符",
    },
  },
  venueId: {
    required: true,
    errorMessages: {
      required: "场馆地址不能为空",
    },
  },
  date: {
    required: true,
    errorMessages: {
      required: "日期不能为空",
    },
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 250,
    errorMessages: {
      required: "描述不能为空",
      minLength: "描述至少需要10个字符",
      maxLength: "描述不能超过250个字符",
    },
  },
  slug: {
    required: true,
    minLength: 10,
    maxLength: 250,
    errorMessages: {
      required: "slug不能为空",
      minLength: "slug至少需要10个字符",
      maxLength: "slug不能超过250个字符",
    },
  },
} as const;
