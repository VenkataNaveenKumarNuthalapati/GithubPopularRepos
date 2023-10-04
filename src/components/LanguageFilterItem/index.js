import './index.css'

const LanguageFilterItem = props => {
  const {eachTab, activeTabId, onTabChange} = props
  const activeClass = activeTabId === eachTab.id ? 'selected' : ''
  console.log(activeClass)
  return (
    <li className={`${activeClass} filter-item`}>
      <button
        className="tab-button"
        type="button"
        onClick={() => onTabChange(eachTab.id)}
      >
        {eachTab.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
