module.exports = {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 200],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 200],
    "header-max-length": [2, "always", 200],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [0],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        // 其他修改, 比如构建流程, 依赖管理等辅助工具，版本号等
        "chore",
        // 文档：仅文档更改
        "docs",
        // 新特性||功能
        "feat",
        // 缺陷修复
        "fix",
        // 性能：提高性能的代码更改
        "perf",
        // 重构：既不修复bug也不添加功能的代码更改
        "refactor",
        // 恢复：恢复之前的提交
        "revert",
        // 只包含代码格式修改, 注意不是 css 修改，比如代码格式化，去掉空行等
        "style",
        // 新增或者修改已有的测试用例
        "test",
      ],
    ],
  },
};
