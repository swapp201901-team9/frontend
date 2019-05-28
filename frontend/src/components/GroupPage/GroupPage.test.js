import GroupPage from '../components/GroupPage/GroupPage';
import GroupAdminPage from '../components/GroupPage/GroupAdminPage';

describe('GroupPage', () => {
    let component = null

    it('renders correctly', () => {
        component = renderer.create(<GroupPage />)
    })

    it('matches snapshot', () => {
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })

    describe('CreateGroup', () => {
        // group 생성이 잘 되는지 확인
        it('creates group correctly', () => {

        })
    })

    describe('SearchingGroup', () => {
        // 검색이 잘 되는지 확인
        it('searches correctly', () => {

        })
    })

    describe('MyGroupList')
})


describe('GroupAdminPage', () => {
    let component = null

    it('renders correctly', () => {
        component = renderer.create(<GroupAdminPage />)
    })
    describe('ChangeGroupInfo')
    describe('GroupUser')
    describe('GroupDesign')
})

describe('GroupDetailPage', () => {
})