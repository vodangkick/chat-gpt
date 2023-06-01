
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLang } from '../../../store/reducers/setting';
import { RootState } from '../../../store/store';

const LanguageSwitcher = () => {
  const langNew = useSelector((state : RootState) => state.setting.lang);
  console.log(langNew);
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lng: string) => {
    dispatch(setLang(lng));
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    i18n.changeLanguage(langNew);

  }, [langNew])

  return (
    <div>
      <select className="text-black selectLang" value={langNew} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;

