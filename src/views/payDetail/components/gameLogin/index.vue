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
  <div
    class="m-auto w-694 rounded-20 text-24"
    lg="w-700 text-24"
  >
    <div
      class="absolute right-15 top-13 z-10 cursor-pointer rounded-full bg-[#f1f1f1]"
      lg="top-20 right-25"
      @click="handleClose"
    >
      <div
        class="i-material-symbols:close h-32 w-32"
        lg="h-40 w-40"
        style="color:#757575;"
      />
    </div>
    <div class="flex flex-col">
      <div
        class="mt-50 f-c"
        lg="mt-45"
      >
        <img
          class="h-67 w-287"
          lg="h-80 w-300"
          src="@/assets/icons/99-logo.png"
          alt=""
        >
      </div>
      <div class="mt-50 f-c text-30">
        请您输入角色UID
      </div>
      <div class="relative mt-40 f-c flex-col px-60">
        <input
          v-model="inputUid"
          class="w-full border-none text-24 focus:outline-none"
          lg="text-30 "
          type="text"
          autofocus
          placeholder="Enter your user code"
          @blur="handleBlur"
          @focus="showDropdown = true"
        >
        <div
          class="relative mt-15 w-full border-b-[3px] border-[#e0e0e0] border-solid"
          lg="border-b-[6px]"
        />
        <div
          v-if="showDropdown"
          class="shadow-[0 [rgba(0,0,0,0.1)]] absolute left-60 top-55 w-578 border border-[#ccc] border-solid border-t-none bg-[#fff]"
          :class="{ 'border border-[#ccc] border-solid border-t-none': uidRecordList.length > 0 }"
          lg="w-584 left-60 text- top-65 "
        >
          <div
            v-for="(uidRecord, index) in uidRecordList"
            :key="index"
            class="f-b p-8 hover:bg-[#ED6504]"
            @click="selectUIDRecord(uidRecord.uid)"
          >
            <span>{{ uidRecord.uid }} ({{ uidRecord.userName }}) </span>
            <div @click.stop="removeUIDRecord(uidRecord.uid)">
              <div
                class="i-iwwa:delete h-26 w-26"
                style="color: #ED6504;"
              />
            </div>
          </div>
        </div>
        <div
          class="mt-100 h-80 w-full f-c cursor-pointer rounded-80 bg-[#ED6504] color-[#fff]"
          @click="handleConfirm"
        >
          确认
        </div>
        <div class="mb-50 mt-50 f-c cursor-pointer">
          <div>How to get your user code</div>
          <div
            class="i-iconamoon:arrow-right-2-light h-30 w-30"
            style="color: #000;"
          />
        </div>
      </div>
    </div>
  </div>
</template>
