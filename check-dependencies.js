const checkDependenceVersion = require('specified-package-version-check');

async function func() {
  await checkDependenceVersion({
    dependenceArr: ['logger-for-cannot-duplicate', '@shuyun-ep-team/eslint-config', '@shuyun-ep-team/kylin-ui'],
  });
}

func();
