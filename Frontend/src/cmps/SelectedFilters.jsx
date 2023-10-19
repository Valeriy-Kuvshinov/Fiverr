import SvgIcon from './SvgIcon'

export function SelectedFilters({ filterBy , onDeleteFilter}) {
  return (
    <section className="selected-filters-wrapper layout-row">
      <div className="selected-filters">
        {Object.keys(filterBy).map((key) => {
          let text
          switch (key) {
            case 'min':
              text = `Over $${filterBy[key]}`
              break
            case 'max':
              text = `Under $${filterBy[key]}`
              break
            case 'search':
              text = `Results for ${filterBy[key]}`
              break
            default:
              text = filterBy[key]
          }

          return filterBy[key] ? (
            <span
              key={key}
              onClick={() => onDeleteFilter(key)}
              className="select-filter"
            >
              {text}
              <span className="remove-icon">
                <SvgIcon iconName={'remove'} />
              </span>
            </span>
          ) : null
        })}
      </div>
    </section>
  )
}
