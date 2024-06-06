import  { FC } from 'react';
import { Card } from '../../shared/ui/Card';
import { useAuth } from '../../features/auth';
import { Typography } from '../../shared/ui/Typography';
import { COLORS_TEXT } from '../../shared/ui/colors';
import EditIcon from "@mui/icons-material/ModeEditOutlined"
import AddIcon from "@mui/icons-material/AddOutlined"
import { format } from 'date-fns';

interface Props {

}

export const ProfilePage: FC<Props> = function ProfilePage(props) {
    const {user} = useAuth()

    const ICON_STYLE = {bgcolor: "orange", fontSize: 30, borderRadius:5, width:60, height:30, color:"white"}
  return <section className='flex flex-1 flex-wrap p-2 gap-5 mb-20'>
    <Card className='border border-amber-400 w-full flex flex-col gap-3'>
        <div className="flex justify-between">
            <Typography weight={700} size={20}>{"Редактирование профиля"}</Typography>
            <EditIcon sx={ICON_STYLE}/>
        </div>
        <Typography weight={700} size={18} align='center'>{"Название компании"}</Typography>
        <div>
            <Typography color={COLORS_TEXT.secondary300} size={12}>{"ИИН/БИН"}</Typography>
            <Typography size={16}>{user?.organization?.identityNumber || "000000000000"}</Typography>
        </div>
        <div>
            <Typography color={COLORS_TEXT.secondary300} size={12}>{"Адрес"}</Typography>
            <Typography size={16}>{user?.address?.street || "улица"}</Typography>
        </div>
        <div>
            <Typography color={COLORS_TEXT.secondary300} size={12}>{"Электронная почта"}</Typography>
            <Typography size={16}>{user?.email}</Typography>
        </div>
        <div>
            <Typography color={COLORS_TEXT.secondary300} size={12}>{"Номер телефона менеджера"}</Typography>
            <Typography size={16}>{user?.phoneNumber}</Typography>
        </div>
        <div>
            <Typography color={COLORS_TEXT.secondary300} size={12}>{"Регион"}</Typography>
            <Typography size={16}>{user?.address?.region}</Typography>
        </div>
        <div>
            <Typography color={COLORS_TEXT.secondary300} size={12}>{"ФИО"}</Typography>
            <Typography size={16}>{user?.fullName}</Typography>
        </div>
    </Card>
    <Card className='border border-amber-400 w-full flex flex-col gap-3'>
        <div className="flex justify-between">
            <Typography weight={700} size={20}>{"Реквизиты счета"}</Typography>
            <EditIcon sx={ICON_STYLE}/>
        </div>
        { (user?.requisities) ? (
            <>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"Банк"}</Typography>
                <Typography size={16}>{user?.requisities?.bankName || "название банка"}</Typography>
            </div>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"ИИК"}</Typography>
                <Typography size={16}>{user?.requisities?.identityCode}</Typography>
            </div>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"БИК"}</Typography>
                <Typography size={16}>{user?.requisities?.bankCode}</Typography>
            </div>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"КБЕ"}</Typography>
                <Typography size={16}>{user?.requisities?.benCode}</Typography>
            </div>
            </>
        ) : (
            <>
                <Typography>{"Вы еще не добавили реквизиты для оплаты"}</Typography>
                <AddIcon sx={ICON_STYLE}/>
            </>
        )}
    </Card>
    <Card className='border border-amber-400 w-full flex flex-col gap-3'>
        <div className="flex justify-between">
            <Typography weight={700} size={20}>{"Данные для авторизации"}</Typography>
        </div>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"Электронная почта"}</Typography>
                <Typography size={16}>{user?.email}</Typography>
            </div>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"Номер телефона"}</Typography>
                <Typography size={16}>{user?.phoneNumber}</Typography>
            </div>
            <div>
                <Typography color={COLORS_TEXT.secondary300} size={12}>{"Пароль"}</Typography>
                <Typography size={16}>{format(new Date(), "MM/dd/yyyy")}</Typography>
            </div>
    </Card>
  </section>
};