/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import persistedState from 'vuex-persistedstate'


Vue.use(Vuex);
export default new Vuex.Store({
	plugins: [persistedState()],
	state: {
		user: {},
		token: null,
		title: '',
		path: '',
	},
	mutations: {
		[types.LOGIN]: (state, data) => {
			localStorage.setItem('token',data);
			state.token = data;
		},
		[types.LOGOUT]: (state) => {
			localStorage.removeItem('token');
			state.token = null
			state.user={}
		},
		[types.TITLE]: (state, data) => {
			state.title = data;
		},
		['setPath']:(state,data) =>{
			state.path=data;
		},
		['setUserInfo']:(state,data)=>{
			state.user=data;
		}
	},
	getters:{
		getPath: state => {
			return state.path;
		}
	}
})