export const JUDGE_STATUS = {
  '-2': {
    name: 'Compile Error',
    short: 'CE',
    color: 'yellow',
    type: 'warning'
  },
  '-1': {
    name: 'Wrong Answer',
    short: 'WA',
    color: 'red',
    type: 'error'
  },
  '0': {
    name: 'Accepted',
    short: 'AC',
    color: 'green',
    type: 'success'
  },
  '1': {
    name: 'Time Limit Exceeded',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '2': {
    name: 'Time Limit Exceeded',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '3': {
    name: 'Memory Limit Exceeded',
    short: 'MLE',
    color: 'red',
    type: 'error'
  },
  '4': {
    name: 'Runtime Error',
    short: 'RE',
    color: 'red',
    type: 'error'
  },
  '5': {
    name: 'System Error',
    short: 'SE',
    color: 'red',
    type: 'error'
  },
  '6': {
    name: 'Pending',
    color: 'yellow',
    type: 'warning'
  },
  '7': {
    name: 'Judging',
    color: 'blue',
    type: 'info'
  },
  '8': {
    name: 'Partial Accepted',
    short: 'PAC',
    color: 'blue',
    type: 'info'
  },
  '9': {
    name: 'Submitting',
    color: 'yellow',
    type: 'warning'
  }
}

export const CONTEST_STATUS = {
  'NOT_START': '1',
  'UNDERWAY': '0',
  'ENDED': '-1'
}

export const CONTEST_STATUS_REVERSE = {
  '1': {
    name: 'Not Started',
    color: 'yellow'
  },
  '0': {
    name: 'Underway',
    color: 'green'
  },
  '-1': {
    name: 'Ended',
    color: 'red'
  }
}

export const RULE_TYPE = {
  ACM: 'ACM',
  OI: 'OI'
}

export const CONTEST_TYPE = {
  PUBLIC: 'Public',
  PRIVATE: 'Password Protected'
}

export const USER_TYPE = {
  REGULAR_USER: 'Regular User',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin'
}

export const PROBLEM_PERMISSION = {
  NONE: 'None',
  OWN: 'Own',
  ALL: 'All'
}

export const STORAGE_KEY = {
  AUTHED: 'authed',
  PROBLEM_CODE: 'problemCode',
  languages: 'languages'
}

export const DIFFICULTY_MAP ={
  'VeryLow': {
    'value': '매우 쉬움',
    'textColor': '#95ef4c'
  },
  'Low': {
    'value': '쉬움',
    'textColor': '#B5EAB0'
  },
  'Mid': {
    'value': '보통',
    'textColor': '#7c7878'
  },
  'High': {
    'value': '어려움',
    'textColor': '#ff8828'
  },
  'VeryHigh': {
    'value': '매우 어려움',
    'textColor': '#c02b2b'
  }
}

export const FIELD_MAP ={
  '0': {
    'value': '구현',
    'boxColor': '#F8D093'
  },
  '1': {
    'value': '수학',
    'boxColor': '#B5EAB0'
  },
  '2': {
    'value': '자료구조',
    'boxColor': '#F8B193'
  },
  '3': {
    'value': '탐색',
    'boxColor': '#90B8E7'
  },
  '4': {
    'value': '정렬',
    'boxColor': '#EDC3C3'
  }
}



export function buildProblemCodeKey (problemID, contestID = null) {
  if (contestID) {
    return `${STORAGE_KEY.PROBLEM_CODE}_${contestID}_${problemID}`
  }
  return `${STORAGE_KEY.PROBLEM_CODE}_NaN_${problemID}`
}

export const GOOGLE_ANALYTICS_ID = 'UA-111499601-1'


