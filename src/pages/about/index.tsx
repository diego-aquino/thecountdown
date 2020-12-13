import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import axios from 'axios';

import { GitHub, Gmail, LinkedIn } from 'assets';
import { ExternalLink, Layout } from 'components/common';
import styles from 'styles/pages/About.module.css';

interface ResponseUserData {
  name: string;
  bio: string;
  avatar_url: string; // eslint-disable-line camelcase
}

interface UserData {
  name: string;
  bio: string;
  avatarURL: string;
}

interface Props {
  userData: UserData;
}

const About: FC<Props> = ({ userData }) => {
  const { name, bio, avatarURL } = userData;

  return (
    <Layout pageTitle="About | TheCountdown">
      <div className={styles.about}>
        <Image
          className={styles.avatarImage}
          src={avatarURL}
          alt={name}
          width={164}
          height={164}
          priority
        />
        <h1 className={styles.name}>{name}</h1>
        <h3 className={styles.role}>Developer and maintainer</h3>
        <hr className={styles.separator} />
        <p className={styles.bio}>{bio}</p>

        <div className={styles.social}>
          <ExternalLink
            className={styles.socialLink}
            href="https://github.com/diego-aquino"
          >
            <GitHub
              id="socialLinkGithub"
              title="GitHub"
              className={styles.socialLinkIcon}
            />
          </ExternalLink>
          <ExternalLink
            className={styles.socialLink}
            href="https://linkedin.com/in/diego-aquino"
          >
            <LinkedIn
              id="socialLinkLinkedIn"
              title="LinkedIn"
              className={styles.socialLinkIcon}
            />
          </ExternalLink>
          <ExternalLink
            className={styles.socialLink}
            href="mailto:diegocruzdeaquino@gmail.com"
          >
            <Gmail
              id="socialLinkMail"
              title="Mail"
              className={styles.socialLinkIcon}
            />
          </ExternalLink>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<ResponseUserData>(
    'https://api.github.com/users/diego-aquino',
  );

  const userData: UserData = {
    name: data.name,
    bio: data.bio,
    avatarURL: data.avatar_url,
  };

  return {
    props: { userData },
    revalidate: 86400,
  };
};

export default About;
