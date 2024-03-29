<template>
  <div class="flex-container">
    <h3>{{ $t('m.ChangePassword') }}</h3>
    <div>
      <Form class="setting-content" ref="formPassword" :model="formPassword" :rules="rulePassword">
        <label>{{ $t('m.Current_Password') }}</label>
        <FormItem prop="old_password">
          <Input v-model="formPassword.old_password" type="password"/>
        </FormItem>
        <label>{{ $t('m.New_Password') }}</label>
        <FormItem prop="new_password">
          <Input v-model="formPassword.new_password" type="password"/>
        </FormItem>
        <label>{{ $t('m.Password_Again') }}</label>
        <FormItem prop="again_password">
          <Input v-model="formPassword.again_password" type="password"/>
        </FormItem>
        <FormItem v-if="visible.tfaRequired" label="Two Factor Auth" prop="tfa_code">
          <Input v-model="formPassword.tfa_code"/>
        </FormItem>
        <FormItem v-if="visible.passwordAlert">
          <Alert type="success">You will need to login again after 5 seconds..</Alert>
        </FormItem>
        <Button type="primary" @click="changePassword">{{ $t('m.Update_Password') }}</Button>
      </Form>
    </div>
    <!--      <div class="right">-->
    <!--        <h2>{{ $t('m.ChangeEmail') }}</h2>-->
    <!--        <Form class="setting-content" ref="formEmail" :model="formEmail" :rules="ruleEmail">-->
    <!--          <label>{{ $t('m.LoginPassword') }}</label>-->
    <!--          <FormItem  prop="password">-->
    <!--            <Input v-model="formEmail.password" type="password"/>-->
    <!--          </FormItem>-->
    <!--          &lt;!&ndash;          <FormItem :label="$t('m.Old_Email')">&ndash;&gt;-->
    <!--          &lt;!&ndash;            <Input v-model="formEmail.old_email" disabled/>&ndash;&gt;-->
    <!--          &lt;!&ndash;          </FormItem>&ndash;&gt;-->
    <!--          <label>{{ $t('m.New_Email') }}</label>-->
    <!--          <FormItem  prop="new_email">-->
    <!--            <Input v-model="formEmail.new_email"/>-->
    <!--          </FormItem>-->
    <!--          <FormItem v-if="visible.tfaRequired" label="Two Factor Auth" prop="tfa_code">-->
    <!--            <Input v-model="formEmail.tfa_code"/>-->
    <!--          </FormItem>-->
    <!--          <Button type="primary" @click="changeEmail">{{ $t('m.ChangeEmail') }}</Button>-->
    <!--        </Form>-->
    <!--      </div>-->
  </div>
</template>

<script>
import api from '@oj/api'
import {FormMixin} from '@oj/components/mixins'

export default {
  mixins: [FormMixin],
  data() {
    const oldPasswordCheck = [{required: true, trigger: 'blur', min: 6, max: 20}]
    const tfaCheck = [{required: true, trigger: 'change'}]
    const CheckAgainPassword = (rule, value, callback) => {
      if (value !== this.formPassword.new_password) {
        callback(new Error('password does not match'))
      }
      callback()
    }
    const CheckNewPassword = (rule, value, callback) => {
      if (this.formPassword.old_password !== '') {
        if (this.formPassword.old_password === this.formPassword.new_password) {
          callback(new Error('The new password doesn\'t change'))
        } else {
          // 对第二个密码框再次验证
          this.$refs.formPassword.validateField('again_password')
        }
      }
      callback()
    }
    return {
      loading: {
        btnPassword: false,
        btnEmail: false
      },
      visible: {
        passwordAlert: false,
        emailAlert: false,
        tfaRequired: false
      },
      formPassword: {
        tfa_code: '',
        old_password: '',
        new_password: '',
        again_password: ''
      },
      formEmail: {
        tfa_code: '',
        password: '',
        old_email: '',
        new_email: ''
      },
      rulePassword: {
        old_password: oldPasswordCheck,
        new_password: [
          {required: true, trigger: 'blur', min: 6, max: 20},
          {validator: CheckNewPassword, trigger: 'blur'}
        ],
        again_password: [
          {required: true, validator: CheckAgainPassword, trigger: 'change'}
        ],
        tfa_code: tfaCheck
      },
      ruleEmail: {
        password: oldPasswordCheck,
        new_email: [{required: true, type: 'email', trigger: 'change'}],
        tfa_code: tfaCheck
      }
    }
  },
  mounted() {
    this.formEmail.old_email = this.$store.getters.user.email || ''
  },
  methods: {
    changePassword() {
      this.validateForm('formPassword').then(valid => {
        this.loading.btnPassword = true
        let data = Object.assign({}, this.formPassword)
        delete data.again_password
        if (!this.visible.tfaRequired) {
          delete data.tfa_code
        }
        api.changePassword(data).then(res => {
          this.loading.btnPassword = false
          this.visible.passwordAlert = true
          this.$success('Update password successfully')
          setTimeout(() => {
            this.visible.passwordAlert = false
            this.$router.push({name: 'logout'})
          }, 5000)
        }, res => {
          if (res.data.data === 'tfa_required') {
            this.visible.tfaRequired = true
          }
          this.loading.btnPassword = false
        })
      })
    },
    changeEmail() {
      this.validateForm('formEmail').then(valid => {
        this.loading.btnEmail = true
        let data = Object.assign({}, this.formEmail)
        if (!this.visible.tfaRequired) {
          delete data.tfa_code
        }
        api.changeEmail(data).then(res => {
          this.loading.btnEmail = false
          this.visible.emailAlert = true
          this.$success('Change email successfully')
          this.$refs.formEmail.resetFields()
        }, res => {
          if (res.data.data === 'tfa_required') {
            this.visible.tfaRequired = true
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
label {
  display: block;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 1px;
  text-align: left;
}

.flex-container {
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  padding: 10px 40px;

  h3 {
    margin-bottom: 20px;
    text-align: left;
    width: 100%;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    form {
      display: flex;
      flex-direction: column;
      align-items: end;
      div {
        width: 100%;
      }

      button {
        display: block;
        align-self: end;
      }
    }
  }

}

</style>

