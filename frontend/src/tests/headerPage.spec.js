import router from "@/router";

const { shallowMount } = require('@vue/test-utils');
const HeaderPage = require('@/components/headerPage.vue').default;


//import { shallowMount }  from "@vue/test-utils";
//import HeaderPage from './headerPage'

jest.mock('@/router', () => ({
    push: jest.fn(),
}));

jest.mock('localStorage', () => ({
    removeItem: jest.fn(),
}))

describe('HeaderPage.vue', () => {

    it('renders header correctly', () => {
        const wrapper = shallowMount(HeaderPage)

        expect(wrapper.find('.header').exists()).toBe(true)
        expect(wrapper.find('.logo').text()).toBe('StinBank')
        expect(wrapper.find('.navbar').exists()).toBe(true)
        expect(wrapper.find('.logout-button').text()).toBe('Odhlásit se')
    })


    it('calls logout method when button is clicked', async () => {
        const wrapper = shallowMount(HeaderPage)

        // Mock local storage
        const removeItemMock = jest.fn()
        Object.defineProperty(window, 'localStorage', {
            value: {
                removeItem: removeItemMock
            }
        })

        // Trigger click on logout button
        await wrapper.find('.logout-button').trigger('click')

        // Expectations
        expect(removeItemMock).toHaveBeenCalledTimes(1)
        expect(removeItemMock).toHaveBeenCalledWith('client')
    })

})
