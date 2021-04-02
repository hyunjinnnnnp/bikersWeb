const timestamps = document.querySelectorAll("#jsTimestamp");

const drawTime = (item) => {
  const { innerText } = item;
  const today = new Date();
  const createdAt = new Date(item.innerText);
  const betweenTime = Math.floor(
    (today.getTime() - createdAt.getTime()) / 1000 / 60
  );
  const betweenTimeHour = Math.floor(betweenTime / 60);
  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);

  if (betweenTime < 1) {
    return "방금 전";
  } else if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  } else if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  } else if (betweenTimeDay < 7) {
    return `${betweenTimeDay}일 전`;
  } else {
    const str = innerText.split(" ");
    const [, month, date, year] = str;
    return `${month} ${date} ${year}`;
  }
};

if (timestamps) {
  timestamps.forEach((item) => {
    const timestamp = item;
    const date = drawTime(item);
    timestamp.innerText = date;
  });
}
