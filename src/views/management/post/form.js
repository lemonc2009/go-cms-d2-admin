import form from '@/mixins/crud.form'

export default {
  mixins: [ form ],
  data () {
    return {
      api: {
        detail: 'POST_DETAIL',
        create: 'POST_CREATE',
        update: 'POST_UPDATE'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'post_name',
          default: '',
          label: '岗位名称',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.post_name } clearable/>
        },
        {
          prop: 'post_code',
          default: '',
          label: '岗位编码',
          rule: { required: true, message: '必填', trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.post_code } clearable/>
        },
        {
          prop: 'post_sort',
          default: 0,
          label: '显示顺序',
          render: () => <el-input-number min={ 1 } vModel={ this.form.model.post_sort }/>
        },
        {
          prop: 'status',
          default: 1,
          label: '状态',
          render: () => <d2-dict-radio vModel={ this.form.model.status } name="status" button/>
        },
        {
          prop: 'remark',
          default: '',
          label: '备注',
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  }
}
