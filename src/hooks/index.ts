import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '../store';

// приложение будет знать о всех событиях и корректно определять их тип ->
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // связали со стейтом