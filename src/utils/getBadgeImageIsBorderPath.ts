import badgeDefault from 'assets/images/badge01.png';
import badgeNewPost from 'assets/images/badge02.png';
import badgeWrite3Times from 'assets/images/badge03.png';
import badgeTumbler from 'assets/images/badge04.png';
import badgePublicTrans from 'assets/images/badge05.png';
import badgeBasket from 'assets/images/badge06.png';
import badgeCommunity from 'assets/images/badge07.png';

export default function getBadgeImagePath(checkedBadge: string | Promise<string>) {
  switch (checkedBadge) {
    case '신규':
      return badgeDefault;
    case '최초':
      return badgeNewPost;
    case '꾸준':
      return badgeWrite3Times;
    case '텀블':
      return badgeTumbler;
    case '교통':
      return badgePublicTrans;
    case '버켓':
      return badgeBasket;
    case '기록왕':
      return badgeCommunity;
    default:
      return badgeDefault;
  }
}
