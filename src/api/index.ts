import axios from 'axios'
import { axiosCache } from './utils'
import Cookies from 'js-cookie'
import decode from 'jwt-decode'
const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

API.interceptors.request.use((req: TODO) => {
	let accessToken = Cookies.get('crm-access')
	let refreshToken = Cookies.get('crm-refresh')
	let userName = Cookies.get('crm-user')
	if (accessToken) {
		const decodeToken: any = decode(accessToken)
		const now = new Date().getTime()
		if (now > decodeToken.exp * 1000) {
			// get new access token by using refresh token
			axios({
				method: 'get',
				url: `${process.env.REACT_APP_BACKEND_URL}/api/security/user/token/refresh?userName=${userName}&refreshToken=${refreshToken}`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then(function (response) {
					console.log('res below')
					console.log(JSON.stringify(response.data))
				})
				.catch(function (error) {
					console.log('err below')
					console.log(error.response.data.message)
				})
				localStorage.removeItem('userName')
			localStorage.removeItem('userRole')
			Cookies.remove('crm-access')
			Cookies.remove('crm-refresh')
			Cookies.remove('crm-user')
			window.location.href = '/login'
			
		}
		req.headers.Authorization = `Bearer ${accessToken}`
	}

	return req
})

export default API

////////////////////////////////////////////////////////////////////////////////////////////

export const test = () => {
	return API.get(`/api/v1/security/test`)
}

export const test2 = () => {
	return API.get(`/api/v1/chat-history/124`)
}

export const getChatHistoryOfTwoUsers = (receiver: string,pageNumber: number, pageSize: number, q: string) => {
	return API.get(`/api/v1/chat-history/private?receiverName=${receiver}&pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
}

export const getConversations = () => {
	return API.get(`/api/v1/chat-history/conversation`)
}

export const seenMessage = (sender:string) => {
	return API.get(`/api/v1/chat-history/seen?senderName=${sender}`)
}


export const searchMeetup = (pageNumber: number, pageSize: number, q: string) => {
	console.log('search meetup', `/api/v1/schedule/search?pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
	return API.get(`/api/v1/schedule/search?pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
}

export const getMeetupLeadList = (
	startDate: string,
	endDate: string,
	categoryId?: string
) => {

	// return Scheduledata
	console.log('request sent', `/api/v1/schedule/calendar?fromDate=${startDate}T00:00:00.000000&toDate=${endDate}T23:59:59.000000&categories=${categoryId}`)
	return API.get(
		`/api/v1/schedule/calendar?fromDate=${startDate}T00:00:00.000000&toDate=${endDate}T23:59:59.000000&categories=${categoryId}`
	)
}

export const createMeetup = (data: any) => {
	return API.post('/api/v1/schedule/save', data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getCategoryList = () => {
	return API.get('/api/v1/schedule-categories/search')
}


export const getScheduleDetail = (id: number) => {
	return API.get(`/api/v1/schedule/details/${id}`)
}

export const fetchUsers = (
	textSearch: string
) => {
	return API.get(
		`api/v1/security/user/search?textSearch=${textSearch}`
	)
}

export const searchCategories = (q: string) => {
	return API.get(`/api/v1/schedule-categories/search?${q}`)
}

export const createCategories = (data: any) => {
	return API.post(`/api/v1/schedule-categories/save`, data)
}

export const getCategoryDetail = (id: number) => {
	return API.get(`/api/v1/schedule-categories/detail/${id}`)
}
/////////////////////////////////////////////////////////////////////////////////////////








export const fetchLeadApi = (pageNumber: number, pageSize: number) =>
	API.get(
		`/api/aggregation/leads/search?pageNumber=${pageNumber}&pageSize=${pageSize}`
	)

export const createNewLead = (data: any) =>
	API.post(`/api/customer/leads/save`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})

export const fetchProvince = () => {
	return axiosCache(`/api/metadata/address/provinces`, 0.01)
}

export const getDistrict = async (provinceId: number) => {
	const data = await API.get(
		`/api/metadata/address/districts/by-province/${provinceId}`
	)

	return data
}

export const getWard = (districtId: number) => {
	return API.get(`/api/metadata/address/wards/by-district/${districtId}`)
}
export const fetchOccupation = () => {
	return axiosCache(`/api/metadata/profile/occupations`, 0.01)
}

export const fetchWorkPosition = () => {
	return axiosCache(`/api/metadata/profile/work-positions`, 0.01)
}

export const fetchIdentityType = () => {
	return axiosCache(`/api/metadata/profile/identity-types`, 0.01)
}

export const fetchCompany = () => {
	return axiosCache(`/api/customer/public/catalog/companies`, 0.01)
}

export const fetchUser = () => {
	return axiosCache(`/api/user/sale/users`, 0.5)
}

export const fetchLeadStatus = () => {
	return axiosCache(`/api/metadata/profile/status/search/LEAD`, 0)
}

export const fetchLeadSource = () => {
	return axiosCache(`/api/customer/public/catalog/lead-resources`, 0)
}

export const fetchCampaginList = () => {
	return axiosCache(`/api/customer/admin/campaigns/find-all`, 0)
}

export const fetchCustomerGroup = () => {
	return axiosCache(`/api/customer/public/catalog/cust-groups`, 0)
}

export const fetchCustomerType = () => {
	return axiosCache(`/api/customer/public/catalog/cust-types`, 0)
}

export const fetchCustomerSegment = () => {
	return axiosCache(`/api/customer/public/catalog/cust-segments`, 0)
}

export const fetchLeadProduct = () => {
	return axiosCache(`/api/product/products/sub-products`, 0)
}

export const fetchStatusByCampaignId = (id: TODO) => {
	return axiosCache(`/api/customer/admin/project/${id}/lead-status
	`)
}


export const fetchLeadDetail = (id: string) => {
	//return axios.get('http://localhost:4444/lead-detail')
	return API.get(`/api/aggregation/leads/${id}`)
}

export const logout = () => {
	const userName = Cookies.get('crm-user')
	return API.get(`/api/security/user/logout?userName=${userName}`)
}

export const searchLeadText = (
	pageNumber: number,
	pageSize: number,
	textSearch: string
) => {
	return API.get(
		`/api/aggregation/leads/search?pageNumber=${pageNumber}&pageSize=${pageSize}&textSearch=${textSearch}`
	)
}

export const getLeadList = (current: number,
	pageSize: number,
	query: string,
	sort: string) => {
		console.log("api quert", `/api/aggregation/leads/search?pageNumber=${current}&pageSize=${pageSize}${query}${sort}`)
	return API.get(`/api/aggregation/leads/search?pageNumber=${current}&pageSize=${pageSize}${query}${sort}`)
}

export const postLeadBulkAction = (data: {
	listLeadId: number[]
	updateField: string
	updateValue: string
}) => {
	return API.post(`/api/customer/leads/bulk-action`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const exportLeadToExcel = () => {
	return API({
		url: '/api/customer/leads/export?exportType=TYPE_NORMAL', 
		method: 'GET',
		responseType: 'blob',
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'lead-export-file.xls')
		document.body.appendChild(link)
		link.click()
	})
}

export const getDuplicateLead = (id: string) => {
	return API.get(`/api/aggregation/leads/duplicate/${id}`)
}

export const getRelatedLeads = (ids: TODO) => {
	return API.post(
		'/api/customer/leads/related',
		{ listLeadId: ids },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}

export const getWorkingLeadList = (leadId?: string) => {
	return API.get(`/api/customer/leads/workingActivities`, {
		params: { leadId },
	})
	return API.get('http://localhost:4444/lead-detail/working')
}

export const createWorkingLead = (data: any, update=false) => {
	if(update) {
		return API.put('/api/customer/leads/workingActivity', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	return API.post('/api/customer/leads/workingActivity', data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const deleteWorkingLead = (id: number) => {
	return API.delete(`/api/customer/leads/workingActivity/delete/${id}`)
}

export const markCompleteWorking = (id: number) => {
	return API.put(`/api/customer/leads/workingActivity/completed/${id}`)
}

export const markIncompleteWorking = (id: number) => {
	return API.put(`/api/customer/leads/workingActivity/incomplete/${id}`)
}





export const getNoteLeadList = (leadId: string) => {
	// return API.get('http://localhost:4444/lead-detail/notes')
	return API.get(`/api/customer/leads/notes/${leadId}`)
}

export const createNoteLeadList = (leadId: string, content: string) => {
	return API.post(
		`/api/customer/leads/note`,
		{ leadId, content },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}

export const deleteNoteLead = (id: number) => {
	return API.delete(`/api/customer/leads/note/delete/${id}`)
}

export const updateNoteLeadList = (
	id: number,
	leadId: string,
	content: string
) => {
	return API.post(
		`/api/customer/leads/note`,
		{ id, leadId, content },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}

export const getCallingHistoryLeadList = (leadId: string) => {
	return API.get(`/api/customer/leads/${leadId}/calling-history`)
	// return API.get('http://localhost:4444/lead-detail/calls')
}

// import file

export const downloadInportFile = () => {
	return API({
		url: '/api/customer/download/template?fileName=IMPORT_LEAD_TEMPLATE.xlsx&type=xlsx', 
		method: 'GET',
		responseType: 'blob',
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'lead-import-template.xls')
		document.body.appendChild(link)
		link.click()
	})
	return API.get(
		`/api/customer/download/template?fileName=IMPORT_LEAD_TEMPLATE.xlsx&type=xlsx`
	)
}

export const uploadLeadFile = (data: TODO) => {
	console.log('data111111111111111', data)
	return API({
		method: 'post',
		url: '/api/customer/leads/upload-file',
		data,
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return err
		})
}

export const getPreviewUploadFile = (batchId: number) => {
	return API.get(
		`/api/customer/leads/upload-file/leads/search?batchId=${batchId}`
	)
}

export const validateLeadFile = (batchId: number) => {
	return API.post(`/api/customer/leads/upload-file/validate/data/${batchId}`)
}

export const checkDuplicateLeadFile = (
	batchId: number,
	duplicateType?: string,
	importLimit?: string
) => {
	if (!duplicateType) duplicateType = 'all'
	if (!importLimit) importLimit = 'all'
	return API.post(
		`/api/customer/leads/upload-file/validate/duplicate/${batchId}?duplicateType=${duplicateType}&importLimit=${importLimit}`,
		{}
	)
}

export const sendLeadFile = (batchId: number) => {
	return API.post(`/api/customer/leads/upload-file/import/${batchId}`)
}

export const fetchTest = () => {
	const refreshToken = Cookies.get('crm-refresh')
	const userName = 'nam123'
	return API.get(
		`/api/security/user/token/refresh?userName=${userName}&refreshToken=${refreshToken}`
	)
}

// Assign lead

export const postAssignment = (data: TODO) => {
	return API.post(`/api/customer/admin/assign-leads`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const postAssignmentRule = (data: TODO) => {
	return API.post(`/api/customer/admin/assign-leads/rule`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const getAssignmentRules = () => {
	return API.get(`/api/customer/admin/assign-leads/rules/active`)
}

export const getFieldsbyRule = (ruleId: number) => {
	return API.get(`/api/customer/admin/assign-leads/rule/${ruleId}`)
}

export const fetchSearchLeadList = (
	current: number,
	pageSize: number,
	query: string,
	sort: string
) => {
	return API.get(
		`/api/aggregation/admin/assign-leads/leads/search?pageNumber=${current}&pageSize=${pageSize}${query}${sort}`
	)
} // orderType=asc desc   orderBy=full_name, email, phone, created_at



export const fetchUserAssignmentList = (
	teamLead: string,
	branch?: string,
	status?: string
) => {
	return API.get(`api/user/sale/users/by-team?teamLead=${teamLead}`)
}

export const getUserAssignmentDetail = (userName: string) => {
	return API.get(`/api/aggregation/leads/search-sum?assignTo=${userName}`)

}

export const getAssignmentOptions = () => {
	return axiosCache('/api/customer/admin/fields/find-all/SEARCH_LEADS', 0)
}

// CUSTOMER 360
export const fetchCustomerList = (cif: string) => {
	return axiosCache(`/api/report/dashboard/customers/search/legal-cif?legalIdOrCif=${cif}`, 0.01)
}

export const fetchCustomerProductByCif = (cif: string) => {
	return axiosCache(`/api/report/dashboard/customers/products?cif=${cif}`, 0.01)
}

export const fetchDetailProductByCifAndProductType = (cif: string, productType: string) => {
	return axiosCache(`/api/report/dashboard/customers/products/detail?cif=${cif}&procedureName=${productType}`, 0.01)
}

// MARKETING - PROJECT
export const fetchProjectList = (pageNumber: number, pageSize: number, q: string) => {
	return API.get(`/api/customer/admin/projectList?pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
}

export const createProject = (data: TODO) => {
	return API.post(`/api/customer/admin/project`, data)
}

export const getProjectDetail = (projectId: number) => {
	return API.get(`/api/customer/admin/project/${projectId}`)
}

export const fetchAllProjectList = () => {
	return API.get(`/api/customer/admin/project/find-all`)
}


// MARKETING - CAMPAIGN
export const fetchCampaignList = (pageNumber: number, pageSize: number, q: string) => {
	return API.get(`/api/customer/admin/campaigns/search?pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
}

export const createCampaign = (data: TODO) => {
	return API.post(`/api/customer/admin/campaigns/save`, data)
}

export const getCampaignDetail = (projectId: TODO) => {
	if(!projectId) return
	return API.get(`/api/customer/admin/campaigns/${projectId}`)
}

export const getCampaignUserList = () => {
	return API.get(`/api/user/admin/user-groups`)
}

export const getCampaignBranchList = () => {
	return API.get(`/api/user/sale/branchs`)
}