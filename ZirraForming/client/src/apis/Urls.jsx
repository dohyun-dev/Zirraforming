// const HOST = "http://localhost:8080/api/";
const HOST = "https://j7d107.p.ssafy.io/api/";

export default {
  data: () => HOST + "data",
  total: () => HOST + "total",
  //유저정보
  userInfo: (memberId) => HOST + `member/total/${memberId}`,
  checkNick: (nick) => HOST + `duplicatedcheck?nickname=${nick}`,
  changeNick: (memberId) => HOST + `member/${memberId}/changenickname`,
  todayZira: (memberId, date) =>
    HOST + `member/${memberId}/zirraforming/${date}`,

  //지라포밍결과
  myResult: (memberId) => HOST + `member/${memberId}/zirraformingresult`,
};
