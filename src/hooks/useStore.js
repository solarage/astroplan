import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

export default function useStore(
  mapStateToProps = (state) => state,
  mapDispatchToProps = () => {},
  transformFn
) {
  const state = useSelector((store) => {
    if (transformFn) {
      return transformFn(mapStateToProps(store));
    }
    return mapStateToProps(store);
  });

  const dispatch = useDispatch();

  const actions = bindActionCreators(mapDispatchToProps, dispatch);

  return { state, actions };
}
