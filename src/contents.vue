<template>
  <div>
    <div id="header">
      <h2>내용</h2>
    </div>
    <div id="body">
      <!-- 시작 -->
      <div class="contents">
        <div class="content">
          <div style="text-align: right; margin-right: 30px;"></div>
          <table class="tb_board td_border tb_board_view">
            <colgroup>
              <col style="width: 16%;" />
              <col style="width: 34%;" />
              <col style="width: 16%;" />
              <col style="width: 34%;" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <label for="scale">작성자</label>
                </th>
                <td style="text-align: center;">
                  {{ this.$attrs.test.item.Id_name }}
                </td>

                <th
                  scope="row"
                  style="border-left: 1px solid rgb(226, 226, 226);"
                >
                  <label for="scale">날짜</label>
                </th>
                <td colspan="3" style="text-align: center;">
                  {{ this.$attrs.test.item.Enrollment_date }}
                </td>
              </tr>
              <tr>
                <th scope="row" style="width: 40px;">
                  <label for="comNm">제목</label>
                </th>
                <td colspan="3">{{ this.$attrs.test.item.Title }}</td>
              </tr>
              <tr>
                <th scope="row">
                  <label for="ask">내용</label>
                </th>
                <td colspan="3">
                  <textarea
                    wrap="hard"
                    readonly="readonly"
                    cols="80"
                    rows="25"
                    max-rows="15"
                    plaintext
                    style="border: 0px; resize: none;"
                    placeholder="내용"
                    v-model="this.$attrs.test.item.context"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 끝 -->
    </div>
    <div id="footer">
      <div class="wrap_btn" style="margin: 3px 10px 3px 3px; float: right;">
        <b-button
          @click="back()"
          type="button"
          class="btn btn btn_blue btn_big btn-primary btn-lg"
          style="background-color: rgb(29, 90, 115);"
          >목록</b-button
        >

        <b-button
          type="button"
          v-b-modal.modal-1
          class="btn btn btn_blue btn_big btn-primary btn-lg"
          >수정</b-button
        >
        <b-modal id="modal-1" title="수정" size="md" ref="modal" hide-footer>
          <span
            style="   
            margin-right: 45px;
            float: right;"
            v-text="this.$attrs.test.item.Enrollment_date"
          ></span>

          <!-- 수정모달의 입력부분 -->
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
                        v-model="update_info.uptitle"
                        id="comNm"
                        name="comNm"
                        maxlength="100"
                        type="text"
                        style="width: 90%;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <label for="ask">내용</label>
                    </th>
                    <td colspan="3">
                      <textarea
                        v-model="update_info.upcontext"
                        id="ask"
                        name="ask"
                        cols="50"
                        rows="15"
                        maxlength="2000"
                        class="long"
                        style="width: 90%;"
                      ></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- 수정모달 수정 닫기 버튼 -->
              <footer data-v-18b070e0 class="wrap_btn">
                <b-button
                  variant="primary"
                  @click="update()"
                  type="button"
                  class="btn btn_blue btn_big"
                  >수정</b-button
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
        <b-button
          type="button"
          @click="delete_contents()"
          class="btn btn btn_close btn_dgray btn_big btn-secondary btn-lg"
          >삭제</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import mainboard from "./mainboard.vue";
export default {
  data() {
    return {
      update_info: {
        uptitle: this.$attrs.test.item.Title,
        upcontext: this.$attrs.test.item.context,
        up_date: this.$attrs.test.item.Enrollment_date,
        Id_name: "lutes123"
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    update: function() {
      this.$http({
        // get(조회) post(등록), delete(삭제)도 동일
        method: "put",
        url: `http://localhost:8081/board`,
        // get은 data:{}가 필요없음

        data: {
          // post, put, delete에 사용
          Title: this.update_info.uptitle,
          context: this.update_info.upcontext,
          Enrollment_date: this.update_info.up_date,
          Id_name: this.update_info.Id_name,
          // post(등록), put(수정)의 경우만 쓰임
          // resMsg: "this is put test"
          seqNo: this.$attrs.test.item.seqNo /////이게 이상하다///////////
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

      alert("수정완료");
      this.CloseModal();
      //if => 수정완료가 잘 되었으면
      this.$router.go(-1);

      //else => 수정이 잘 안된 경우에 error 메시지 떠야 됨!
    },
    CloseModal() {
      this.$refs.modal.hide();
    },
    delete_contents: function(event) {
      if (confirm("이슈사항을 삭제하겠습니까?")) {
        this.$http({
          // get(조회) post(등록), delete(삭제)도 동일
          method: "delete",
          url: `http://localhost:8081/board`,
          // get은 data:{}가 필요없음
          data: {
            Title: this.update_info.uptitle,
            context: this.update_info.upcontext,
            Enrollment_date: this.update_info.up_date,
            Id_name: this.update_info.Id_name,
            // post(등록), put(수정)의 경우만 쓰임
            // resMsg: "this is put test"
            seqNo: this.$attrs.test.item.seqNo /////이게 이상하다///////////
            // post, put, delete에 사용
            // seqNo: 1,
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

        this.$router.go(-1);
      }
    }
  },
  mounted() {
    console.log("beforeCreated");
  }
};
</script>

<style></style>
