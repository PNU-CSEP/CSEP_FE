<template>
  <div class="noticeBox">
    <div class="noticeBoxHeader">
      <span @click="handleRoute('notice')">공지사항</span>
      <div class="plusDiv" @click="goAnnouncement('')">
        <Icon type="android-add" size="13" color="#7a7a7a"></Icon>
        <span>더보기</span>
      </div>
    </div>
    <template v-if="listVisible">
      <ul class="announcements-container" key="list">
        <li
          v-for="(announcement, idx) in announcements"
          :key="announcement.title"
        >
          <div class="flex-container">
            <div class="title">
              <a class="entry" @click="goAnnouncement(announcement)">
                {{ announcement.title }}
              </a>
              <span class="newAnnotator" v-if="idx == 0">new</span>
            </div>

            <div class="date">
              {{ getOnlyDate(announcement.create_time) }}
            </div>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import api from '@oj/api'
import Pagination from '@oj/components/Pagination'

export default {
  name: 'HomeNoticeBox',
  data () {
    return {
      limit: 10,
      total: 10,
      btnLoading: false,
      announcements: [],
      announcement: '',
      listVisible: true
    }
  },
  mounted () {
    this.getAnnouncementList()
  },
  methods: {
    getAnnouncementList(page = 1) {
      this.btnLoading = true;
      api.getAnnouncementList((page - 1) * this.limit, this.limit).then(
        res => {
          this.btnLoading = false;
          this.announcements = res.data.data.results;
          this.total = res.data.data.total;
        },
        () => {
          this.btnLoading = false;
        }
      );
    },
    handleRoute(route) {
      this.$router.push({name: route});
    },
    getOnlyDate(date) {
      let onlyDate = new Date(date);
      return onlyDate.toLocaleDateString();
    },
    goAnnouncement(announcement) {
      console.log(announcement)
      this.$router.push({name: "notice", params: {announcement: announcement}});
      // this.announcement = announcement;
      // this.listVisible = false;
    },

  },
  computed: {

  }
}
</script>

<style scoped lang="less">
.noticeBox {
  background-color: #ffffff;
  border-radius: 7px;
  border: 1px solid #dedede;
  width: 100%;
  height: 400px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  .noticeBoxHeader {
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dedede;

    span:first-child {
      font-weight: 650;
      font-size: 15px;
    }

    .plusDiv{
      cursor: pointer;

      span {
        color: #7a7a7a;
        font-size: 12px;
      }
    }

  }
}

.announcements-container {
  margin-top: 10px;
  margin-bottom: 10px;

  li {
    padding-top: 15px;
    list-style: none;
    padding-bottom: 15px;
    background-color: rgba(251, 251, 251, 0.38);
    padding-left: 30px;
    border-radius: 7px;
    font-size: 16px;
    margin-bottom: 5px;

    &:last-child {
      border-bottom: none;
    }

    .flex-container {
      .title {
        flex: 1 1;
        text-align: left;
        padding-left: 10px;

        a.entry {
          color: #495060;

          &:hover {
            color: #4a86c0;
            //border-bottom: 1px solid #4a86c0;
          }
        }
      }

      .newAnnotator {
        background-color: #fa6c6c;
        border-radius: 4px;
        color: #ffffff;
        font-size: x-small;
        text-align: center;
        width: 23px;
        margin: auto;
        padding-left: 3px;
        padding-right: 3px;
      }

      .date {
        flex: none;
        width: 200px;
        text-align: center;
        font-size: small;
        color: #737373;
      }
    }
  }
}
</style>

