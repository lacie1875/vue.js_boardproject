<template>
  <div id="mainboard">
    <div data-v-36c7706a class="search_board">
      <!-- 게시판 타이틀 -->
      <h2 data-v-36c7706a class="title">게시판</h2>
      <div id="bb">
        <select
          data-v-36c7706a
          name="scale"
          id="search_option"
          title="검색옵션"
        >
          <option data-v-36c7706a value="all">전체</option>
          <option data-v-36c7706a value="제목">제목</option>
          <option data-v-36c7706a value="인덱스">인덱스</option>
          <option data-v-36c7706a value="작성자id">작성자</option>
        </select>
        <input
          data-v-36c7706a
          placeholder=" 내용을 입력하세요"
          class="please_input_data"
        />
        <button class="btn btn btn-secondary" type="button">검색</button>
      </div>
    </div>
    <div>
      <div>
        <!-- 게시판 테이블-->
        <b-table
          striped
          hover
          :items="items"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          id="my-table"
        >
          <template v-slot:cell(btn)="data">
            <b-button variant="info" @click="update(data)" v-b-modal.modal-1
              >내용</b-button
            >
          </template>
        </b-table>
        <div id="write_button">
          <b-button v-b-modal.modal-2 type="button" variant="success" id="write"
            >글쓰기</b-button
          >

          <b-modal
            id="modal-2"
            size="md"
            ref="modal"
            title="글쓰기"
            hide-footer
          >
            <div id="modal-prevent-closing___BV_modal_body_" class="modal-body">
              <form id="consultReqForm" method="post" style="display: block;">
                <table
                  class="tb_board td_border tb_board_view"
                  style="margin: 16px;"
                >
                  <colgroup>
                    <col style="width: 16%;" />
                    <col style="width: 34%;" />
                    <col style="width: 16%;" />
                    <col style="width: 34%;" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label for="comNm" style="width: 50px;">제목</label>
                      </th>
                      <td colspan="3">
                        <input
                          id="comNm"
                          name="comNm"
                          maxlength="100"
                          type="text"
                          style="width: 90%;"
                          v-model="newinfo.newtitle"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="comNm" style="width: 50px;">날짜</label>
                      </th>
                      <td colspan="3">
                        <input
                          id="comNm"
                          name="comNm"
                          maxlength="100"
                          type="text"
                          style="width: 90%;"
                          v-model="newinfo.Enrollment_date"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="ask">내용</label>
                      </th>
                      <!-- v-model="items[0].Title" -->
                      <td colspan="3">
                        <textarea
                          id="ask"
                          name="ask"
                          cols="50"
                          rows="15"
                          maxlength="2000"
                          class="long"
                          style="width: 90%;"
                          v-model="newinfo.newcontext"
                        ></textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <footer class="wrap_btn">
                  <b-button
                    variant="primary"
                    @click="newinput()"
                    type="button"
                    class="btn btn_blue btn_big"
                    >등록</b-button
                  >
                  <b-button
                    @click="CloseModal()"
                    type="button"
                    class="btn btn_close btn_dgray btn_big"
                    >닫기</b-button
                  >
                </footer>
              </form>
            </div>
          </b-modal>
        </div>
      </div>

      <div style="clear:both;">
        <!-- 게시판 페이지네이션-->
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          style="justify-content: center;"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// var boardData = {
//   seqNo: 0,
//   name: "",
//   title: "",
//   addDate: now()
// };

export default {
  // components: { VueTableDynamic }

  data() {
    return {
      //필드에 연결되어서 새롭게 들어가는 애들
      // info: "",
      perPage: 3,
      currentPage: 1,
      newinfo: {
        //contents뷰로 넘겨주는 애들
        newtitle: "",
        newcontext: "",
        Id_name: "lutes123",
        Enrollment_date: this.$moment(new Date()).format("YYYY-MM-DD")
      },

      //표에 들어가는 각 필드들
      fields: [
        {
          key: "seqNo",
          sortable: true,
          label: "Index"
        },
        {
          key: "Id_name",
          sortable: true,
          label: "아이디"
        },
        {
          key: "Title",
          sortable: false,
          label: "제목"
        },
        {
          key: "Enrollment_date",
          sortable: true,
          label: "등록날짜"
        },
        {
          key: "btn",
          value: "",
          label: "자세히보기"
        }
      ],

      items: []
    };
  },
  methods: {
    update(data) {
      this.$router.push({
        name: "contents",
        path: "/mainboard/contents",
        params: { test: data }
      });

      // this.info = data.item;
      // console.log(this.info);
    },
    CloseModal() {
      this.$refs.modal.hide();
    },
    newinput() {
      this.$http({
        // get(조회) post(등록), delete(삭제)도 동일
        method: "post",
        url: `http://localhost:8081/board`,
        // get은 data:{}가 필요없음
        data: {
          //db에 들어가는 데이터들
          // post, put, delete에 사용
          seqNo: this.items.length + 1,
          Title: this.newinfo.newtitle, //db 변수명 : this.newinfo.newtitle
          context: this.newinfo.newcontext,
          Id_name: this.newinfo.Id_name,
          Enrollment_date: this.newinfo.Enrollment_date
          //내용 넣을 변수 물어보기!!!
          // post(등록), put(수정)의 경우만 쓰임
          // resMsg: "this is put test"
        }
      })
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });

      this.$refs.modal.hide();
    },
    getItems() {
      this.$http({
        // get(조회) post(등록), delete(삭제)도 동일
        method: "get",
        url: `http://localhost:8081/board`
        // get은 data:{}가 필요없음
        // data: {
        // post, put, delete에 사용
        // seqNo: 1,
        // post(등록), put(수정)의 경우만 쓰임
        // resMsg: "this is put test"
        // }
      })
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  computed: {
    rows() {
      return this.items.length;
    }
  },

  mounted() {
    this.getItems();
  }
};
</script>

<style>
div {
  text-align: -webkit-center;
}

.table {
  width: 70%;
}
.title {
  text-align: -webkit-center;
  margin: 20px;
}
.search_board {
  text-align: -webkit-center;
  padding: 20px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 10px;
}
.custom-select {
  width: 100px;
  margin-right: 12px;
  margin-left: 7px;
  padding-left: 5px;
}
.please_input_data {
  margin-right: 7px;
  height: 38px;
  width: 500px;
}

.btn btn btn-secondary {
  margin-bottom: 5px;
}
#write {
  margin: 10px;
  float: right;
}

#write_button {
  width: 70%;
}

#bb {
  width: 70%;
  height: 50px;
  border: 20px;
  /* background-color: rgb(199, 156, 240); */
}
#search_option {
  height: 38px;
}
</style>
