const { shallowMount, mount } = require('@vue/test-utils');
const betweenComponent = require('@/components/betweenComponent.vue').default;

jest.mock('@/router', () => ({
    push: jest.fn(),
}));

describe('betweenComponent.vue', () => {
    let wrapper = shallowMount(betweenComponent);


    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.welcome').exists()).toBe(true)
        expect(wrapper.find('.logo').exists()).toBe(true)
        expect(wrapper.find('.logo').text()).toBe('StinBank')
        expect(wrapper.find('.write-code').text()).toBe('Zadej ověřovací kod')
    })

    it('calls router.push when login button is clicked with correct code', async () => {
        // Set code and code_from_mail data properties
        const mockRoute = {
            params: {
                id: 1
            }
        }
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = mount(betweenComponent, {
            props: {
                code: '1234',
                code_from_mail: '1234'
            },
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        // Find and click login button
        const loginButton = wrapper.find('.login-button')
        await loginButton.trigger('click')

        // Expect router.push to have been called with correct argument
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })

    it('does not call router.push when login button is clicked with incorrect code', async () => {
        // Set code and code_from_mail data properties
        const mockRoute = {
            params: {
                id: 1
            }
        }
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = mount(betweenComponent, {
            props: {
                code: '1234',
                code_from_mail: '5678'
            },
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        // Find and click login button
        const loginButton = wrapper.find('.login-button')
        await loginButton.trigger('click')

        // Expect router.push not to have been called
        expect(mockRouter.push).not.toHaveBeenCalled()
    })
})
