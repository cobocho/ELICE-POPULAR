import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import ProfileUploadButton from './ProfileUploadButton';
import ProfileButton from './ProfileButton';
import { User } from '../../../types/user';
import { useParams } from 'react-router-dom';

interface Props {
  user: User;
}

const ProfileImageModify = ({ user }: Props) => {
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  const [userProfile, setUserProfile] = useState<string | null>(null);

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserProfile(reader.result as string);
      };
      reader.onerror = () => {
        console.log('Error');
      };
      reader.readAsDataURL(file);
    }
  };

  const fileDelete = () => {
    const delConfirm = confirm('프로필 이미지를 기본으로 변경하시겠습니까?');
    if (delConfirm) {
      setUserProfile('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://34.22.81.36:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pw: user.pw,
          profile: userProfile,
          introduce: user.introduce,
          nickname: user.nickname,
          phone_number: user.phone_number,
          interested_category: user.interested_category,
          allow_notification: user.allow_notification,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert('회원정보 수정이 완료되었습니다.');
      } else {
        throw new Error('회원정보 수정에 실패했습니다.');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="update-title">프로필 이미지</h2>
        <p className="update-description">프로필 이미지를 변경할 수 있습니다.</p>
        <ProfileContents>
          <ProfilImage>
            <div className="profile-frame">
              {user.profile === '' ? (
                <img src={'/defaultProfile.svg'} className="default-style" />
              ) : (
                <img src={user.profile} alt={user.nickname} className="profile-style" />
              )}
            </div>
          </ProfilImage>
          <ProfileButtonList>
            <ProfileUploadButton text={'프로필 선택'} name={'profile'} onChange={fileHandler} multiple={true} />
            <ProfileButton className="button-gap" text={'변경'} theme={'submit'} />
            <ProfileButton className="button-gap" text={'제거'} theme={'blank'} onClick={fileDelete} />
          </ProfileButtonList>
        </ProfileContents>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  transition: all 0.3s;

  @media all and (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }

  .update-title {
    font-size: var(--font-small);
    font-weight: var(--weight-semi-bold);
  }
  .update-description {
    font-size: var(--font-micro);
    color: var(--color-light-black);
    margin-top: 7px;
  }
`;

const FormContainer = styled.form``;

const ProfileContents = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const ProfilImage = styled.div`
  .profile-frame {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    .default-style {
      width: 100%;
    }

    .profile-style {
      width: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
const ProfileButtonList = styled.div`
  .button-gap {
    margin-left: 3px;
  }
`;

export default ProfileImageModify;
