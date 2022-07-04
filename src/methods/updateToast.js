import emitter from './emitter';

const message = (res, title = '更新') => {
  if (res.data.success) {
    emitter.emit('message', {
      style: 'dark',
      title: `${title}成功`,
    });
  } else {
    emitter.emit('message', {
      style: 'danger',
      title: `${title}失敗`,
      content: res.data.message.join('、'),
    });
    console.log(res.data.message.join('、'), title);
  }
};

export default message;
