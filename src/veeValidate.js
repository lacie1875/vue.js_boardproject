import Vue from 'vue'
import App from 'app'
import VeeValidate, {Validator} from 'vee-validate'

Vue.use(VeeValidate, {})

async function login()
{
    const validform = await this.$validator.validateAll()
    if(!validform) return alert("내용을 한번 더 확인해주세요")

    //form submit 처리에 대한 코드 작성
}