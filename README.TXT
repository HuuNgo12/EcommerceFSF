1. Dùng firebase để làm database. Dùng để cấu hình auth
- Register: signInWithEmailLink, updatePassword
- Login: signInWithEmailAndPassword, signInWithPopup
2. DÙng Toast mesage để hiễn thị các thông báo đẩy.
3. useDispatch cuar react-redux dùng để dispatch đi data vào redux state, còn useSelector dùng để get data từ redux state 
 let { user } = useSelector((state) => ({ ...state }));