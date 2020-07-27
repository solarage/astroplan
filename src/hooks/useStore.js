import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

export default function useStore(
  mapStateToProps = (state) => state,
  mapDispatchToProps = () => {}
) {
  const state = useSelector((selectedState) => mapStateToProps(selectedState));
  const dispatch = useDispatch();

  const actions = bindActionCreators(mapDispatchToProps, dispatch);

  return { state, actions };
}
