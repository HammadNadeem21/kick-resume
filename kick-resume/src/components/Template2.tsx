import Image from 'next/image';
import React, { useState } from 'react'

const Template2 = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);



  return (
    <div>
      <div className="w-32 h-32 rounded-full overflow-hidden bg-blue-500 p-1">
  {previewUrl && (
    <Image
    height={128}
    width={128}
    src={previewUrl} className="object-cover w-full h-full rounded-full" alt="Headshot" />
  )}
</div>
    </div>
  )
}

export default Template2
