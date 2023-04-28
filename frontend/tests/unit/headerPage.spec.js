import { mount } from '@vue/test-utils'
import HeaderComponent from '../../src/components/headerPage'

describe('HeaderComponent', () => {
    it('logout button triggers the logout method', () => {
        const wrapper = mount(HeaderComponent)

        wrapper.find('.logout-button').trigger('click')

        //expect(localStorage.removeItem).toHaveBeenCalledWith('client')
        expect(wrapper.vm.$route.path).toBe('/')
    })
})
