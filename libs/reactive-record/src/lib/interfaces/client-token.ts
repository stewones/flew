export interface ClientToken {
  type: string; // eg: `Bearer`
  value?: string; // eg: `gwMynL_BLSmsAVj0Lv2ajQ4P9el2rxDnThZOZr6ooAW_EAuIY5GSv0ak`
}

export interface RRClientToken extends ClientToken {}
