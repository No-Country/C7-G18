//#region  PATH STORE
const home = 'home';
const storePage = 'store';
const detailProductPage = 'detailProduct';
const buyPage = 'buy';
const accountPage = 'account';

export const PATHS_STORE_PAGES = {
	withSlash: `/${home}`,
	onlyPath: home,
	storePage: {
		withSlash: `/${storePage}`,
		onlyPath: storePage
	},
	detailProductPage: {
		withSlash: `/${detailProductPage}`,
		onlyPath: detailProductPage
	},
	buyPage: {
		withSlash: `/${buyPage}`,
		onlyPath: buyPage
	},
	accountPage: {
		withSlash: `/${accountPage}`,
		onlyPath: accountPage
	}
};
//#endregion

//#region PATH DASHBOARD ADMIN
/*const dashboardPage = 'dashboard';
const statisticsPage = 'statistics';
const productsPage = 'products'; 
const categoryPage = 'category';
const subCategoryPage = 'subCategory';
const marksPage = 'marks';
const ordersPage = 'orders';
const usersPage='users';
const myAccountPage ='accountPage'

export const PATHS_HOME_PAGES = {
	
};*/

//#region NOT FOUND
export const PATH_NOT_FOUND_PAGE = {
	'not-found': {
		withSlash: '/not-found',
		onlyPath: 'not-found'
	}
};
//#endregion
