<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { UIDRecord, UserInfo } from '@/types/index'

// todo input 输入校验
const emit = defineEmits(['onCloseLogin', 'onClickLogin'])

const inputUid = ref('')
// 输入校验函数 @input="validateInput"
// function validateInput(event: Event) {
//   const inputElement = event.target as HTMLInputElement
//   let value = inputElement.value

//   // 移除所有非数字字符
//   value = value.replace(/\D/g, '')

//   // 更新输入框的值
//   inputUid.value = value
// }

function validateInput() {
  if (inputUid.value === '') {
    ElMessage.error('UID不能爲空')
    return false
  }
  return true
}

const showDropdown = ref(false)
// 选择账号
function selectUIDRecord(uidValue: string) {
  inputUid.value = uidValue
  showDropdown.value = false
}

// 处理输入框失去焦点事件
function handleBlur() {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}
function handleClose() {
  emit('onCloseLogin')
}

function handleConfirm() {
  // 校验 不能为空
  if (validateInput()) {
    emit('onClickLogin', inputUid.value)
  }
}

// 缓存uid相关
const uidRecordList = ref<Array<UIDRecord>>([])
const storageKey = 'ccsgUIDRecord'
uidRecordList.value = getUIDRecord()

function getUIDRecord() {
  try {
    const recordStorage = localStorage.getItem(storageKey)
    const record = recordStorage ? JSON.parse(recordStorage) : []
    console.log(record, 'record')
    return record
  }
  catch (error) {
    console.log(error)
  }
}
function removeUIDRecord(uid: string) {
  console.log('remove')
  try {
    const recordStorage = localStorage.getItem(storageKey)
    console.log(recordStorage, 'recordStorage')
    const record = recordStorage ? JSON.parse(recordStorage) : []
    const index = record.findIndex((_item: UIDRecord) => {
      return _item.uid === uid
    })
    record.splice(index, 1)
    localStorage.setItem(storageKey, JSON.stringify(record))
    uidRecordList.value = getUIDRecord()
  }
  catch (error) {
    console.log(error)
  }
}

function saveUIDRecord(userInfo: UserInfo) {
  try {
    const recordStorage = localStorage.getItem(storageKey)
    const record = recordStorage ? JSON.parse(recordStorage) : []
    // 去重
    const index = record.findIndex((_item: UIDRecord) => {
      return _item.uid === userInfo.uid
    })
    if (index > -1) {
      record.splice(index, 1)
    }
    record.unshift({
      uid: userInfo.uid,
      userName: userInfo.nick,
    })
    localStorage.setItem(storageKey, JSON.stringify(record))
    uidRecordList.value = getUIDRecord()
    // const uidDom = document.getElementById('uid-input')
    // uidDom && uidDom.focus()
  }
  catch (error) {
    console.log(error)
  }
}
defineExpose({ saveUIDRecord })
</script>

<template>
  <div class="min-w-350 rounded-16 text-16">
    <div class="h-45">
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute right-15 top-13 z-10 h-24 w-24 cursor-pointer" @click="handleClose">
        <circle opacity="0.08" cx="12" cy="12" r="12" fill="#333" />
        <g stroke="#666" stroke-width="2" stroke-linecap="round"><path d="m8.691 15.531 7.071-7.07M8.691 8.469l7.071 7.07" /></g>
      </svg>
    </div>

    <div class="mx-20 my-20 h-400 flex flex-col">
      <div class="mb-29 f-c">
        <img class="h-87 w-80" src="https://static.lilithgame.com/p/park-user-portal-web/1.7.1/lilithcn.svg" alt="">
      </div>
      <div class="content">
        <div class="mb-12 text-center text-26 font-semibold leading-35">
          请您输入角色UID
        </div>
        <div class="relative mb-20 w-full f-c">
          <input
            v-model="inputUid" class="w-full border border-[#ced4da] rounded-12 border-solid px-10 py-5 text-16 focus:outline-none"
            type="text" autofocus @blur="handleBlur" @focus="showDropdown = true"
          >
          <div v-if="showDropdown" class="2px 4px shadow-[0 [rgba(0,0,0,0.1)]] absolute left-0 top-[100%] w-full border border-[#ccc] border-solid border-t-none bg-[#fff]">
            <div
              v-for="(uidRecord, index) in uidRecordList"
              :key="index" class="f-b p-8 hover:bg-red"
              @click="selectUIDRecord(uidRecord.uid)"
            >
              <span>{{ uidRecord.uid }} ({{ uidRecord.userName }}) </span>
              <div @click.stop="removeUIDRecord(uidRecord.uid)">
                <div class="i-iwwa:delete h-[1em] w-[1em]" style="color: #e21818;" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-20 w-full f-c">
          <button type="submit" class="h-40 w-200 cursor-pointer border-red rounded-12 border-solid border-solid bg-red" @click="handleConfirm">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
