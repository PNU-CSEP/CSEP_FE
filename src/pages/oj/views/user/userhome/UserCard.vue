<script>
import ShineWrapper from "@oj/components/ShineWrapper.vue";
import {TierImageSrc} from "../../../../../utils/constants";

// const profile = {
//   avatar: "https://avatars.githubusercontent.com/u/48755175?v=4",
//   user: {
//     username: "minmunui",
//     email: "ehdwls1638@pusan.ac.kr",
//     school: "공과대학",
//     major: "전기컴퓨터공학부 정보컴퓨터공학전공",
//     create_time: "2021-09-01T15:00:00.000Z",
//     admin_type: 0,
//     _id: "6130b4b0e7c9d9b4e8b3f7b5",
//   },
//   github: "",
//   blog: "",
// }

export default {
  name: "user-card",
  components: {ShineWrapper},
  props: ['profile'],
  computed: {
    TierImageSrc() {
      return TierImageSrc
    },
    isMyProfile() {
      return this.$store.getters.user.username === this.profile.user.username;
    }
  },
  methods: {}
};
</script>

<template>
  <div class="user-card">
    <div class="avatar-container">
      <img class="avatar" :src="profile.avatar"/>
    </div>
    <div class="user-info">
      <div class="username">
        {{ profile.user.username }}
        <div class="user-rank">
          <shine-wrapper>
            <img :src="TierImageSrc[profile.user.rank_tier]" class="rank-mark"/>
          </shine-wrapper>
        </div>
      </div>
      <div class="user-description">{{ profile.user.email }}</div>
      <div class="user-description">{{ profile.school || "대학" }}</div>
      <div class="user-description">{{ profile.major || "전공" }}</div>
      <div v-if="profile.mood" class="user-description mood">{{ profile.mood || "" }}</div>
    </div>
    <div class="container-right">
      <div id="modify-button-wrapper">
        <router-link v-if="isMyProfile" :to="{name : 'default-setting'}">{{ $t('m.User_Setting') }}</router-link>
      </div>
      <div id="icons">
        <a :href="profile.github">
          <Icon type="social-github-outline" size="30"></Icon>
        </a>
        <a :href="'mailto:'+ profile.user.email">
          <Icon class="icon" type="ios-email-outline" size="30"></Icon>
        </a>
        <a :href="profile.blog">
          <Icon class="icon" type="ios-world-outline" size="30"></Icon>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.user-card {
  width: 100%;
  padding: 30px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #dedede;
  border-radius: 7px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  .avatar-container {
    z-index: 1;
    width: 30%;
    padding: 0 50px;

    .avatar {
      width: 100%;
      height: auto;
      object-fit: contain;
      border-radius: 50%;
      box-shadow: 0 1px 1px 0;
    }
  }

  .user-info {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 1;

    .username {
      font-size: 20px;
      font-weight: 700;
      display: flex;

      .user-rank {
        width: 30px;
        height: 30px;
        position: relative;
      }

      .rank-mark {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .user-description {
      font-size: 14px;
      font-weight: 500;
    }

    .mood {
      background-color: #f0f0f0;
      border-radius: 5px;
      width: 100%;
      font-size: 12px;
      padding : 5px 10px;
      margin-top: 10px;
      text-align: left;
    }
  }

  .container-right {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;


  }
}

#modify-button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;

  a {
    font-size: 14px;
    color: #495060;
    text-decoration: none;

    &:hover {
      color: #1890ff;
    }
  }
}

#icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 20px;
  padding: 10px;

  a:hover {
    scale: 1.20;
    transition: scale 0.3s ease;
  }
}


</style>
