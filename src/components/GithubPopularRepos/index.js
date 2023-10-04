import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusList = {
  success: 'SUCCESS',
  loading: 'lOADING',
  failure: 'FAILURE',
}
class GithubPopularRepos extends Component {
  state = {
    gitReposList: [],
    activeTabId: languageFiltersData[0].id,
    status: statusList.loading,
  }

  componentDidMount() {
    const {activeTabId} = this.state
    this.getReposList(activeTabId)
  }

  getReposList = async activeTabId => {
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const request = await fetch(url)
    const data = await request.json()
    const convertedData = data.popular_repos.map(eachObj => ({
      avatarUrl: eachObj.avatar_url,
      forksCount: eachObj.forks_count,
      id: eachObj.id,
      issuesCount: eachObj.issues_count,
      name: eachObj.name,
      starsCount: eachObj.stars_count,
    }))
    console.log(request.ok)
    if (request.ok === true) {
      this.setState({gitReposList: convertedData, status: statusList.success})
    } else {
      this.setState({status: statusList.failure})
    }
  }

  onTabChange = tabId => {
    this.setState(preState => ({
      activeTabId: tabId,
      gitReposList: preState.gitReposList,
      status: statusList.loading,
    }))
    this.getReposList(tabId)
  }

  renderSuccess = (activeTabId, gitReposList, status) => {
    switch (status) {
      case statusList.loading:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case statusList.failure:
        return (
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure-view"
          />
        )
      case statusList.success:
        return gitReposList.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))
      default:
        return null
    }
  }

  render() {
    const {activeTabId, gitReposList, status} = this.state
    return (
      <div>
        <center>
          <h1>Popular</h1>
          <ul className="filter-container">
            {languageFiltersData.map(eachTab => (
              <LanguageFilterItem
                key={eachTab.id}
                eachTab={eachTab}
                activeTabId={activeTabId}
                onTabChange={this.onTabChange}
              />
            ))}
          </ul>

          <ul className="each-repo-container">
            {this.renderSuccess(activeTabId, gitReposList, status)}
          </ul>
        </center>
      </div>
    )
  }
}

export default GithubPopularRepos
