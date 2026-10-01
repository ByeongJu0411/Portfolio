import Image from "next/image";
import { UserIcon } from "@/components/icons";
import { PROFILE_PHOTO } from "@/data/about";

/** 증명사진. 데이터 파일의 PROFILE_PHOTO가 null이면 placeholder를 보여준다. */
export function ProfilePhoto() {
  return (
    <figure className="w-(--about-photo-width) max-w-about-photo">
      {PROFILE_PHOTO ? (
        <Image
          src={PROFILE_PHOTO.src}
          alt={PROFILE_PHOTO.alt}
          placeholder="blur"
          sizes="300px"
          // 원본 비율(7:9)을 그대로 써서 잘리지 않게 한다
          className="h-auto w-full rounded-photo"
        />
      ) : (
        <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-photo border-(length:--border-width) border-dashed border-border bg-placeholder text-detail text-text-sub lg:gap-3.5">
          <UserIcon className="size-8.5 lg:size-10" />
          <span>증명사진 (3:4)</span>
        </div>
      )}
    </figure>
  );
}
