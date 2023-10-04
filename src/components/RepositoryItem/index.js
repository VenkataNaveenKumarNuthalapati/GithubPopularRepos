import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = eachRepo
  return (
    <li className="each-repo-item">
      <img className="avatar-image" src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div className="count">
        <img
          className="icon-image"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="count">
        <img
          className="icon-image"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="count">
        <img
          className="icon-image"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
