import Swal from 'sweetalert2';

const onShareAlert = () => {
    const currentUrl = window.location.href;

    Swal.fire({
        icon: 'info',
        title: '현재 주소 공유',
        html: `
      <input type="text" id="share-url" readonly value="${currentUrl}" style="width:100%; padding:8px; font-size:14px; border:1px solid #ccc; border-radius:4px;" />
      <button id="copy-btn" style="margin-top:10px; padding:8px 16px; background:#3085d6; color:white; border:none; border-radius:4px; cursor:pointer;">
        주소 복사하기
      </button>
    `,
        showConfirmButton: false,
        didOpen: () => {
            const input = Swal.getPopup().querySelector('#share-url');
            const btn = Swal.getPopup().querySelector('#copy-btn');

            // 자동으로 텍스트 선택
            input.select();

            btn.addEventListener('click', () => {
                navigator.clipboard.writeText(currentUrl).then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '복사 완료!',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                });
            });
        },
        customClass: {
            popup: 'my-alert',
            title: 'my-title',
            htmlContainer: 'my-text',
            confirmButton: 'my-confirm-btn',
        },
    });
};

export default onShareAlert;
